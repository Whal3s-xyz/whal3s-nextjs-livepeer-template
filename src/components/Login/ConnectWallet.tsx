import React, {useState} from 'react';
import Button from "../Button";
import notify from "../../utils/notify";

// @ts-ignore
const ConnectWallet = ({utility}) => {
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

export default ConnectWallet;
