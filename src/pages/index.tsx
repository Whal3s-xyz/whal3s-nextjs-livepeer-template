import Layout from "@/components/Layout";
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "@/lib/session";
import {NftValidationUtility} from "@whal3s/whal3s.js";
import {User} from "@/pages/api/user";
import Button from "@/components/Button";
import dynamic from "next/dynamic";

const DynamicLogin = dynamic(() => import('@/components/login/Login'), {
    ssr: false,
    loading: () => <Button
        isLoading={true}
        className=""
        onClick={() => {
        }}
    >Initializing</Button>,
})

type Props = {
    user?: User
}
export default function Home({user} : Props) {
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


