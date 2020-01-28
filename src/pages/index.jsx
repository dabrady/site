import React from "react";

import Layout from "@components/layout";
import SEO from "@components/seo";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <a href="/posts">To the blog!</a>
    </Layout>
  );
};

export default IndexPage;
