/** @jsxImportSource theme-ui */

import BaseContentLayout from '@components/BaseContentLayout';
import { Link } from '@components/core';

export default function BaseContent({ children }) {
  return (
    <BaseContentLayout>
      <Link href='/' sx={{ display: 'block', marginBottom: '1.3rem' }}>
        ← Back
      </Link>
      {children}
    </BaseContentLayout>
  );
}
