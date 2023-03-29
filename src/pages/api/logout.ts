// pages/api/logout.ts

import { withIronSessionApiRoute } from "iron-session/next";
import {sessionOptions} from "@/lib/session";

export default withIronSessionApiRoute(
    function logoutRoute(req, res) {
        req.session.destroy();
        res.json({
            isLoggedIn: false,
            walletAddress: "",
            signature: "",
            accessToken: ""
        });
    },
    sessionOptions
);
