import {withIronSessionApiRoute} from "iron-session/next";
import {sessionOptions} from "@/lib/session";

const CryptoJS = require("crypto-js");


export default withIronSessionApiRoute(
    async function verifyLivepeerRoute(req, res) {
        try {
            const {accessKey, webhookContext} = req.body;
            console.log(accessKey)
            const walletAddress = CryptoJS.AES.decrypt(accessKey, process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
            console.log(walletAddress)
            const utilityId = process.env.WHAL3S_UTILITY_ID;

            const response = await fetch(`https://app.whal3s.xyz/api/v0/nft-validation-utilities/${utilityId}/wallet/${walletAddress}`)
            console.log(response.status)
            res.status(response.status).send('')
        } catch (e) {
            res.status(500).send('')
        }

    },
    sessionOptions
);
