// pages/admin.tsx

import { withIronSessionSsr } from "iron-session/next";
import {sessionOptions} from "@/lib/session";

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user;

        if (user?.isLoggedIn !== true) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                user: req.session.user,
            },
        };
    },
    sessionOptions
);
