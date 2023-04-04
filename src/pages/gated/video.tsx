import React from 'react';
import Layout from "@/components/Layout";
import {withIronSessionSsr} from "iron-session/next";
import {sessionOptions} from "@/lib/session";
import ReactPlayer from 'react-player'

// @ts-ignore
const Video = ({user}) => {
    return (
      <Layout header="Gated video">
          <p>https://playback.livepeer.studio/asset/hls/f9f96eryysmjdbnk/index.m3u8?accessKey={user.accessToken}</p>
          <ReactPlayer url={`https://playback.livepeer.studio/asset/hls/f9f96eryysmjdbnk/index.m3u8?accessKey=${user.accessToken}`}  controls={true} />
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
