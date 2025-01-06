/** @jsxImportSource theme-ui */

import dayjs from 'dayjs';
import { Heading } from 'theme-ui';

import BaseContentLayout from '@components/BaseContentLayout';
import ContentHeader from '@components/ContentHeader';
import { Link } from '@components/core';
import Signature from '@components/Signature';

export default function BlogPost({ children, pageContext }) {
  return (
    <BaseContentLayout
      sx={{
        paddingBottom: ['inherit', '4rem'],
      }}
    >
      <ContentHeader
        sidelink={<Link href='/blog'>← back</Link>}
      >
        <aside
          sx={{
            display: 'inline-block',
            position: ['inherit', 'relative'],
            textAlign: 'right',
            padding: ['0.3rem 0', '0'],
            marginBottom: ['inherit', '0rem'],
            border: 'none',
            width: 'fit-content',
            left: 'inherit',
          }}
        >
          <p>
            {dayjs(pageContext.frontmatter.date).format('D MMMM, YYYY @ HH:mm')}
          </p>
        </aside>
      </ContentHeader>

      {children}

      <Signature date={pageContext.frontmatter.date}/>
    </BaseContentLayout>
  );
}
