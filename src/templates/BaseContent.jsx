/** @jsxImportSource theme-ui */

import { Heading } from "theme-ui";

import BaseContentLayout from '@components/BaseContentLayout';
import { Link } from '@components/core';

export default function BaseContent({ children }) {
  return (
    <BaseContentLayout>
      <Heading as='h1' variant='text.title'>
        <Link
          href='/'
          sx={{
            display: 'block',
            marginBottom: '1.3rem',
            fontWeight: 'normal',
          }}
        >
          ← home
        </Link>
      </Heading>
      {children}
    </BaseContentLayout>
  );
}
