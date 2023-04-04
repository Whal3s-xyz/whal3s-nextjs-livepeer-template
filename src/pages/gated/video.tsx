import React from 'react';
import Layout from "@/components/Layout";
import {withIronSessionSsr} from "iron-session/next/index";
import {sessionOptions} from "@/lib/session";

// @ts-ignore
const Video = ({user}) => {
    return (
      <Layout header="Gated video">
          <p>https://playback.livepeer.studio/asset/hls/f9f96eryysmjdbnk/index.m3u8?{user.accessToken}</p>
          <video src={`https://playback.livepeer.studio/asset/hls/f9f96eryysmjdbnk/index.m3u8?${user.accessToken}`} controls className="w-full"/>
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
