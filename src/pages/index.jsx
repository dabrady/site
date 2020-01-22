import React from "react";

import Layout from "@components/layout";
import SEO from "@components/seo";
import SignPost from "@components/sign_post";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <a href="/posts">To the blog!</a>
      <SignPost />
    </Layout>
  );
};

export default IndexPage;
