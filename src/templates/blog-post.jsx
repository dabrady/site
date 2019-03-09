import { css } from "@emotion/core";
import { graphql } from "gatsby";
import React from "react";

import Layout from "@components/layout";

import { rhythm } from "../utils/typography";

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div
        css={css`
          margin: 0 auto;
          max-width: 700px;
          padding: ${rhythm(2)};
          /* padding-top: ${rhythm(1.5)}; */
        `}
      >
        <h1
          css={css`
            margin-bottom: ${rhythm(1 / 4)};
          `}
        >
          {post.frontmatter.title}
        </h1>
        <h5
          css={css`
            color: #bbb;
          `}
        >
          <em>{post.frontmatter.date}</em>
        </h5>
        <div
          css={css`
            margin-top: ${rhythm(1)};
          `}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`;
