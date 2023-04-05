import React, {useState} from 'react';
import Button from "../Button";
import notify from "../../utils/notify";
import {NftValidationUtility} from "@whal3s/whal3s.js";

type Props = {
    utility: NftValidationUtility
}
const ConnectWalletButton = ({utility}: Props) => {
    const [loading, setLoading] = useState(false);
    const connectWallet = () => {
        setLoading(true)
        utility.connectWallet()
            .catch((e: any) => {
                notify('Error', e.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Button
            isLoading={loading}
            className=""
            onClick={() => {
                connectWallet()
            }}>Connect Wallet</Button>
    );
};

export default ConnectWalletButton;
