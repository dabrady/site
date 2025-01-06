/** @jsxImportSource theme-ui */

import dayjs from 'dayjs';
import dayjs__dayOfYear from 'dayjs/plugin/dayOfYear';
dayjs.extend(dayjs__dayOfYear);

import { useStaticQuery, graphql } from "gatsby";
import { last, round } from 'lodash';
import { Box, Heading, Paragraph } from "theme-ui";

import { Link } from '@components/core';
import SEO from '@components/SEO';

import theme from '@styles/theme';

import BaseContent from '@templates/BaseContent';

export function Head({ location }) {
  return (
    <SEO
      title={(baseTitle) => `${baseTitle} → Blog`}
      pathname={location.pathname}
      description="Thoughts and words I'd like to share with you."
    />
  );
}

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

  // Time things
  var newestPost = dayjs(postNodes[0].frontmatter.date);
  var oldestPost = dayjs(last(postNodes).frontmatter.date);
  var timeInterval = newestPost.diff(oldestPost, 'year');
  var suffix = timeInterval > 0
      ? `, ${timeInterval} year${timeInterval > 1 ? 's' : ''}`
      : '';

  return (
    <BaseContent>
      <Box>
        <Heading as='h1' sx={{
          fontFamily: 'monospace',
          fontStyle: 'normal',
        }}>
          ./blog
        </Heading>
        <ul sx={{ paddingBottom: '1.2rem' }}>
          {postNodes.map(({ frontmatter: { title, date: rawDate }, fields }) => {
            var { slug } = fields;
            var date = dayjs(rawDate);
            return (
              <li key={slug} sx={theme.treelistItem}>
                <Link
                  href={slug}
                  sx={{
                    fontFamily: 'code',
                    // NOTE(dabrady) This manually aligns wrapped titles
                    display: 'inline-block',
                    textIndent: [0, '-7rem'],
                    paddingLeft: [0, '7rem'],
                  }}
                >
                  <span sx={{
                    display: ['block', 'inline'],
                    paddingRight: '1rem',
                    color: 'aside',
                    whiteSpace: 'pre-wrap',
                  }}>
                    [{`${date.dayOfYear()}.${date.year()}`}]
                  </span>
                  <span sx={{
                  }}>
                    {title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Paragraph variant='monospace'>{postCount} posts{suffix}</Paragraph>
      </Box>
    </BaseContent>
  );
}
