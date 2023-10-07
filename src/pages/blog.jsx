/** @jsxImportSource theme-ui */

import dayjs from 'dayjs';
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
  var now = dayjs();
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
          {postNodes.map(({ frontmatter: { title, date }, fields }) => (
            <li key={fields.slug} sx={theme.treelistItem}>
              <Link
                href={fields.slug}
                sx={{
                  fontFamily: 'code',
                  // NOTE(dabrady) This manually aligns wrapped titles
                  display: 'inline-block',
                  textIndent: [0, '-9.4rem'],
                  paddingLeft: [0, '9.4rem'],
                }}
              >
                <span sx={{
                  display: ['block', 'inline'],
                  paddingRight: '1rem',
                  color: 'aside',
                  whiteSpace: 'pre-wrap',
                }}>
                  {/* NOTE(dabrady) Show year instead of time for posts older than the current year */}
                  [{dayjs(date).format(`MMM DD ${now.diff(date, 'year') > 0 ? ' YYYY' : 'HH:mm'}`)}]
                </span>
                <span sx={{
                }}>
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Paragraph variant='monospace'>{postCount} posts{suffix}</Paragraph>
      </Box>
    </BaseContent>
  );
}
