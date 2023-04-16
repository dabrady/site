/** @jsxImportSource theme-ui */

import { MDXProvider } from '@mdx-js/react';

import { graphql } from 'gatsby';
import { Heading } from 'theme-ui';

import * as CoreComponents from '@components/core';

import BaseContent from '@templates/BaseContent';
import BlogPost from '@templates/BlogPost';

const shortcodes = {
  a: CoreComponents.Link,
  ...CoreComponents,
};

const templates = {
  ['blog']: BlogPost
}

export default function MDXPage({ children, data, ...props }) {
  const Template = templates[data.mdx.parent.relativeDirectory] || BaseContent;
  return (
    <MDXProvider components={shortcodes}>
      <Template {...props}>{children}</Template>
    </MDXProvider>
  );
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      parent {
        ... on File {
          relativeDirectory
        }
      }
    }
  }
`;
