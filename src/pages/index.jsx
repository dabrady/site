import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

import "./index.css";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>
      in the beginning there was darkness
      <a href="https://www.gatsbyjs.org/">…</a>
    </h1>
  </Layout>
);

export default IndexPage;
