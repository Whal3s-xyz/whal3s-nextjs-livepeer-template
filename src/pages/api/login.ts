// pages/api/login.ts
const CryptoJS = require("crypto-js");
import {withIronSessionApiRoute} from "iron-session/next";
import {sessionOptions} from "@/lib/session";
import fetchJson, {FetchError} from "@/lib/fetchJson";

export default withIronSessionApiRoute(
    async function loginRoute(req, res) {

        const { walletAddress, signature } = req.body;

        const options = {method: 'GET', headers: {accept: 'application/json'}};
        try {
            console.log(`https://app.whal3s.xyz/api/v0/signature-messages?utility_id=${process.env.WHAL3S_UTILITY_ID}&wallet_address=${walletAddress}&signature=${signature}`)
            const response = await fetch(`https://app.whal3s.xyz/api/v0/signature-messages?utility_id=${process.env.WHAL3S_UTILITY_ID}&wallet_address=${walletAddress}&signature=${signature}`, options)
            console.log(response.status)
            if (response.status == 200){

                const user = {
                    isLoggedIn: true,
                    walletAddress: walletAddress,
                    signature: signature,
                    accessToken: CryptoJS.AES.encrypt(walletAddress, process.env.ENCRYPTION_KEY).toString(),
                };
                req.session.user = user;
                await req.session.save();
                res.json(user);
            }  else {
                throw 'Invalid signature'
            }
        } catch (error) {
            console.error("An unexpected error happened:", error);

            req.session.user = {
                isLoggedIn: false,
                walletAddress: '',
                signature: '',
                accessToken: ''
            };
            await req.session.save();
            res.status(500).json({ message: (error as Error).message });
        }

    },
    sessionOptions
);
