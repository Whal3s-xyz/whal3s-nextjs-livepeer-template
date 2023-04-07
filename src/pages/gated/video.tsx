import React from 'react';
import Layout from "@/components/Layout";
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "@/lib/session";
import {User} from "@/pages/api/user";
import dynamic from "next/dynamic";
import {createReactClient, LivepeerConfig, studioProvider} from "@livepeer/react";

const Player = dynamic(() => import('@livepeer/react').then((mod) => mod.Player), { ssr: false });

type Props = {
    user?: User
}

const livepeerClient = createReactClient({
    provider: studioProvider({
        apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY ?? '',
    }),
});
const Video = ({user}: Props) => {
    return (
      <Layout header="Gated video">
          <LivepeerConfig client={livepeerClient}>
            <Player playbackId='f9f96eryysmjdbnk' accessKey={user?.accessToken} />
          </LivepeerConfig>
          {/*<p>https://playback.livepeer.studio/asset/hls/f9f96eryysmjdbnk/index.m3u8?accessKey={user?.accessToken}</p>*/}
      </Layout>
    );
};

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

export default Video;
