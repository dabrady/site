/** @jsxImportSource theme-ui */

import { MDXProvider } from '@mdx-js/react';

import { graphql } from 'gatsby';
import { Heading } from 'theme-ui';

import BaseContentLayout from '@components/BaseContentLayout';
import * as CoreComponents from '@components/core';

const shortcodes = {
  a: CoreComponents.Link,
  ...CoreComponents,
};

export default function PostTemplate({ children, data }) {
  return (
    <BaseContentLayout>
      <Heading as='h1' variant='text.title'>
        {data.mdx.frontmatter.title}
      </Heading>
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