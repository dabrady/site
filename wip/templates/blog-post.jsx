import { Helmet } from "react-helmet";
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { graphql } from "gatsby";
import React from "react";

import Layout from "../components/blog_layout";

export default ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout>
      <Helmet title={post.frontmatter.title} />
      <div
        css={css`
          margin: 0 auto;
          max-width: 700px;
          /* padding: 0 rhythm(2); */
        `}
      >
        <h1
          css={css`
            /* margin-bottom: rhythm(1 / 4); */
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
            /* margin-top: rhythm(1); */
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
