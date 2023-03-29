import React, {useState} from 'react';
import Button from "../Button";
import notify from "../../utils/notify";
import {NftValidationUtility} from "@whal3s/whal3s.js";

// @ts-ignore
const SignMessage = ({utility}) => {
    const [loading, setLoading] = useState(false);
    const sign = () => {
        setLoading(true)
        utility.sign()
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
                sign()
            }}>Sign Message</Button>

    );
};

export default SignMessage;
