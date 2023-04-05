/** @jsxImportSource theme-ui */
import { Heading, Paragraph } from "theme-ui";

import MainLayout from "@components/MainLayout";
// import SEO from "@components/SEO";

export default function NotFoundPage() {
  return (
    <MainLayout>
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
    </MainLayout>
  );
}
