import React from 'react';
import Layout from "@/components/Layout";

const Video = () => {
    return (
      <Layout header="Gated video">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/uIhmVQTmUzs?controls=0"
                  title="YouTube video player" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen></iframe>
      </Layout>
    );
};

export default Video;
