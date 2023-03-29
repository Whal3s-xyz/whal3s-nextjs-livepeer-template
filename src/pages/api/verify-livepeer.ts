import {NextApiRequest, NextApiResponse} from "next";
const CryptoJS = require("crypto-js");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const {accessKey, webhookContext} = req.body;
        const walletAddress = CryptoJS.AES.decrypt(accessKey, process.env.ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        const utilityId = process.env.WHAL3S_UTILITY_ID;

        const response = await fetch(`https://app.whal3s.xyz/api/v0/nft-validation-utilities/${utilityId}/wallet/${walletAddress}`)
        res.status(response.status).send('')
    } catch (e) {
        res.status(500).send('')
    }
}
