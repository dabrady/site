/** @jsxImportSource theme-ui */

import { useStaticQuery, graphql } from "gatsby";
import { round } from 'lodash';
import { Box, Heading, Paragraph } from "theme-ui";

import { Link } from '@components/core';
import theme from '@styles/theme';
import BaseContent from '@templates/BaseContent';

export default function Blog() {
  var {
    allMdx: {
      nodes: postNodes,
      totalCount: postCount,
    }
  } = useStaticQuery(graphql`
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
  `);

  return (
    <BaseContent>
      <Box>
        <Heading as='h1' style={{
          fontFamily: 'monospace',
          fontStyle: 'normal',
        }}>
          ./blog
        </Heading>
        <ul>
          {postNodes.map(({ frontmatter, fields }) => (
            <li
              key={fields.slug}
              sx={theme.treelistItem}
            >
              <Link
                href={fields.slug}
                sx={{ fontFamily: 'code' }}
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
