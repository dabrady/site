/** @jsxImportSource theme-ui */

import dayjs from 'dayjs';
import { Heading } from 'theme-ui';

import BaseContentLayout from '@components/BaseContentLayout';
import Signature from '@components/Signature';

export default function BlogPost({ children, pageContext }) {
  return (
    <BaseContentLayout
      sx={{
        paddingBottom: ['inherit', '4rem'],
      }}
    >
      <aside
        sx={{
          float: ['right', 'left'],
          textAlign: 'right',
          padding: ['0.3rem 0', '0'],
          border: 'none',
          width: 'calc(2.5rem * 3)',
          '@media screen and (min-width: 1200px)': {
            left: '0',
            width: 'calc(2.5rem * 4)',
          },
        }}
      ><p>
         {dayjs(pageContext.frontmatter.date).format('D MMMM, YYYY')}
       </p>
      </aside>
      {children}
      <Signature date={pageContext.frontmatter.date}/>
    </BaseContentLayout>
  );
}
