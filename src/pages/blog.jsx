/** @jsxImportSource theme-ui */

import { graphql } from "gatsby";
import { Box, Heading, Paragraph } from "theme-ui";

import { Link } from '@components/core';
import BaseContent from '@templates/BaseContent';

export default function Blog({ data }) {
  var postNodes = data.allMdx.nodes;
  var postCount = data.allMdx.totalCount;

  return (
    <BaseContent>
      <Box>
        <Heading as='h1'>.</Heading>
        <ul>
          {postNodes.map(({ frontmatter, fields }) => (
            <li
              key={fields.slug}
              sx={{
                marginBottom: 0,
                marginLeft: '0.4rem',
                paddingLeft: '2.5rem',
                paddingBottom: '1rem',
                borderLeft: '1px solid',
                "&:nth-last-of-type(2)": {
                  paddingBottom: '1.85rem',
                },
                "&:last-child": {
                  marginTop: '-0.85rem',
                  marginLeft: 'calc(0.4rem + 1px)',
                  borderLeft: 'none',
                },

                "&::before": {
                  content: '"—"',
                  marginLeft: '-2.6rem',
                },
              }}
            >
              <Link
                href={fields.slug}
                sx={{
                  fontFamily: 'monospace'
                }}
              >
                {frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
        <Paragraph variant='monospace'>{postCount} posts</Paragraph>
      </Box>
    </BaseContent>
  );
}
export const query = graphql`
  query {
    allMdx(
      filter: {
        internal: { contentFilePath: { regex: "/src/content/blog/" } }

        # NOTE(dabrady) Blog posts must be explicitly published to be listed.
        frontmatter: { published: { eq: true } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date
        }
      }
    }
  }
`;
