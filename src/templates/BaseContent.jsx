/** @jsxImportSource theme-ui */

import { Box, Heading } from "theme-ui";

import BaseContentLayout from '@components/BaseContentLayout';
import ContentHeader from '@components/ContentHeader';
import { Link } from '@components/core';

export default function BaseContent({ children }) {
  return (
    <BaseContentLayout>
      <ContentHeader
        sidelink={<Link href='/'>← home</Link>}
      />

      {children}
    </BaseContentLayout>
  );
}
