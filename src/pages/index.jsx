import { css } from "@emotion/core";
import { graphql, Link } from "gatsby";
import React from "react";
import gray from "gray-percentage";

import Layout from "@components/layout";
import SEO from "@components/seo";

import { rhythm } from "../utils/typography";

const dateWidth = rhythm(3.4);
const postDate = css`
  width: ${dateWidth};
  float: left;
  text-align: right;

  h6 {
    margin-top: ${0};
    margin-right: ${rhythm(2 / 3)};
    color: ${gray(10, 0, true)};
    font-style: italic;
  }
`;

const postLink = css`
  margin-left: ${dateWidth};
  margin-bottom: ${rhythm(1 / 4)};
`;

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {data.allMarkdownRemark.edges.map(({ node }, index) => (
      <div key={node.id}>
        <div css={postDate}>
          <h6>{node.frontmatter.date}</h6>
        </div>
        <div css={postLink}>
          <Link to={node.fields.slug}>
            <h1>{node.frontmatter.title}</h1>
            {/* TODO Only show excerpt for "selected" post */}
            <p>{node.excerpt}</p>
          </Link>
        </div>
      </div>
    ))}
  </Layout>
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: ASC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(fromNow: true)
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default IndexPage;
