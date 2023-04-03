import DynamicLogin from "@/components/Login/DynamicLogin";
import Layout from "@/components/Layout";
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "@/lib/session";



// @ts-ignore
export default function Home({user}) {
    return (
        <Layout header="Login">
            {user?.isLoggedIn !== true && <DynamicLogin/>}
               {user?.isLoggedIn === true && <div>Logged in as {user.walletAddress}</div>}
               {user?.isLoggedIn === true && <div>Access token: {user.accessToken}</div>}
        </Layout>
    )
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {

        return {
            props: {
                user: req?.session?.user ?? null,
            },
        };
    },
    sessionOptions
);


