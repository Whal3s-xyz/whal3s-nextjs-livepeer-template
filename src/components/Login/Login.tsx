import React, {useEffect, useState} from 'react';
import Whal3s, {NftValidationUtility} from '@whal3s/whal3s.js'
import Button from "@/components/Button";
import Uninitialized from "@/components/Login/Uninitialized";
import ConnectWallet from "@/components/Login/ConnectWallet";
import SignMessage from "@/components/Login/SignMessage";
import fetchJson from "@/lib/fetchJson";
import useUser from "@/lib/useUser";
import notify from "@/utils/notify";
import toast from "react-hot-toast";

const Login = () => {

    const {mutateUser} = useUser({
        redirectTo: "/gated/video",
        redirectIfFound: true,
    });

    const [utility, setUtility] = useState<NftValidationUtility | undefined>(undefined);

    const [step, setStep] = useState<number>(0);


    const [loading, setLoading] = useState(false);
    const init = async () => {
        const whal3s = new Whal3s({
            accountCenter: {
                mobile: {
                    enabled: true, // enable the account center on mobile
                    position: 'bottomRight', // position the account center to bottom right
                },
                desktop: {
                    enabled: true, // enable the account center on desktop
                    position: 'bottomRight', // position the account center to bottom right
                },
            }
        });
        const _utility = await whal3s.createValidationUtility(process.env.whal3sUtilityId ?? '')
        _utility.addEventListener('stepChanged', (event) => {
            console.log((event as CustomEvent).detail)
            console.log('step', _utility.step)
            setUtility(_utility)
            setStep(_utility.step)
        })
        _utility.addEventListener('signed', () => {
            setUtility(_utility)
            login(_utility)
        })
        setStep(_utility.step)
        setUtility(_utility)
    }

    // @ts-ignore
    const login = async (utility) => {
        setLoading(true)
        try {
            const response = await mutateUser(
                await fetchJson("/api/login", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        signature: utility?.signature,
                        walletAddress: utility?.wallet?.address,

                    }),
                }),
                false,
            );
            if(!response?.isLoggedIn)
                notify('Error', 'Login failed, Wallet not eligible')


        } catch (e:any) {
            notify(e.message, 'Wallet not eligible')
        }

        setLoading(false)
    }

    useEffect(() => {
        init()
    }, [])


    return (
        <div>
            {step === NftValidationUtility.STEP_UNINITIALIZED && <Uninitialized/>}
            {step === NftValidationUtility.STEP_INITIALIZED && <ConnectWallet utility={utility}/>}
            {step >= NftValidationUtility.STEP_WALLET_CONNECTED && !utility?.signature && <SignMessage utility={utility}/>}
            {utility?.signature && <Button onClick={login} disabled={loading}
                                           isLoading={loading}>{loading ? 'Logging in' : 'Log in'}</Button>}
        </div>
    );
};

export default Login;
