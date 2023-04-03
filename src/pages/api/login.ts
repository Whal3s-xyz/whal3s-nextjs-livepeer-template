// pages/api/login.ts:
const CryptoJS = require("crypto-js");
import {withIronSessionApiRoute} from "iron-session/next";
import {sessionOptions} from "@/lib/session";

export default withIronSessionApiRoute(
    async function loginRoute(req, res) {

        const {walletAddress, signature} = req.body;

        const options = {method: 'GET', headers: {accept: 'application/json'}};
        try {
            const response = await fetch(`https://app.whal3s.xyz/api/v0/signature-messages?utility_id=${process.env.WHAL3S_UTILITY_ID}&wallet_address=${walletAddress}&signature=${signature}`, options)
            const eligibilityResponse = await fetch(`https://app.whal3s.xyz/api/v0/nft-validation-utilities/${process.env.WHAL3S_UTILITY_ID}/wallet/${walletAddress}`)
            const eligibilityResponseJson = await eligibilityResponse.json()

            if (response.status !== 200)
                throw 'Invalid signature'
            if (eligibilityResponse.status !== 200 || !eligibilityResponseJson.valid)
                throw 'Wallet not eligible'

            const user = {
                isLoggedIn: true,
                walletAddress: walletAddress,
                signature: signature,
                accessToken: CryptoJS.AES.encrypt(walletAddress, process.env.ENCRYPTION_KEY).toString(),
            };
            req.session.user = user;
            await req.session.save();
            res.json(user);

        } catch (error){
            req.session.user = {
                isLoggedIn: false,
                walletAddress: '',
                signature: '',
                accessToken: ''
            };
            await req.session.save();
            res.status(403).json({message: (error as Error).message});
        }

    },
    sessionOptions
);
