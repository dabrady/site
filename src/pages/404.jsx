/** @jsxImportSource theme-ui */
import { Heading, Paragraph } from "theme-ui";

import FullscreenNoScrollLayout from "@components/FullscreenNoScrollLayout";
// import SEO from "@components/SEO";

export default function NotFoundPage() {
  return (
    <FullscreenNoScrollLayout>
      {/* <SEO title="404: Not found" /> */}
      <Heading as='h1'>HMM....</Heading>
      <pre sx={{ fontFamily: 'monospace' }}>
          {`
     __//
    /.__.\\
    \\ \\/ /
 '__/    \\
  \\-      )
   \\_____/
_____|_|____
     " "
`}
      </pre>
      <Paragraph>This place doesn&#8217;t exist....The sadness.</Paragraph>
      <Paragraph>...But then of course, if this place doesn&#8217;t exist, are you really here?</Paragraph>
    </FullscreenNoScrollLayout>
  );
}
