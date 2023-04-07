/** @jsxImportSource theme-ui */

import { MDXProvider } from '@mdx-js/react';

import { graphql } from 'gatsby';
import { Heading } from 'theme-ui';

import BaseContentLayout from '@components/BaseContentLayout';
import Link from '@components/Link';

const shortcodes = {
  a: Link,
};

export default function PostTemplate({ children, data }) {
  return (
    <BaseContentLayout>
      <Heading as='h1'>{data.mdx.frontmatter.title.toLowerCase()}</Heading>
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
    </BaseContentLayout>
  );
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
