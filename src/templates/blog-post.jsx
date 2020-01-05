import { Helmet } from 'react-helmet';
import { css } from "@emotion/core";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";

import { rhythm } from "@utils/typography";
import Layout from "@components/layout";

export default ({ data }) => {
  const { mdx: post } = data;
  return (
    <Layout>
      <Helmet title={post.frontmatter.title} />
      <div
        css={css`
          margin: 0 auto;
          max-width: 700px;
          padding: 0 ${rhythm(2)};
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
        <MDXRenderer
          css={css`
            margin-top: ${rhythm(1)};
          `}
        >
          {post.body}
        </MDXRenderer>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
      }
    }
  }
`;
