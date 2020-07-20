import React from "react";
import { css } from "@emotion/core";

import Layout from "@components/layout";
import SEO from "@components/seo";

import { theme } from "@utils/typography";
import colors, { lighten, darken } from "@utils/themes/colors";

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <h1
        css={css`
          font-size: 16px;
          font-family: "SF Mono", Monaco, monospace;
          color: ${theme.colors.accent};
          margin: 0 0 10px 3px;
        `}
      >
        Hi, my name is
      </h1>
      <h2
        css={css`
          font-size: 80px;
          font-weight: 600;
          line-height: 1.1;
          margin: 0;
        `}
      >
        Daniel Brady.
      </h2>
      <h3
        css={css`
          font-size: 80px;
          font-weight: 600;
          line-height: 1.1;
          margin: 0 0 10px;
          color: ${darken(theme.colors.body, 0.3)};
        `}
      >
        I am not a web developer.
      </h3>
      <p>
        Here is <a>link that goes elsewhere</a> if you click it.
      </p>
    </Layout>
  );
};

export default IndexPage;
