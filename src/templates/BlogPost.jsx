import { Heading } from 'theme-ui';

import BaseContentLayout from '@components/BaseContentLayout';
import Signature from '@components/Signature';

export default function BlogPost({ children, pageContext }) {
  return (
    <BaseContentLayout>
      <Heading as='h1' variant='text.title'>
        {pageContext.frontmatter.title}
      </Heading>
      {children}
      <Signature date={pageContext.frontmatter.date}/>
    </BaseContentLayout>
  );
}
