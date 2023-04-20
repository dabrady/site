/** @jsxImportSource theme-ui */

import { Box, Heading, Link } from "theme-ui";

import FullscreenNoScrollLayout from "@components/FullscreenNoScrollLayout";
// import SEO from "@components/SEO.jsx";
import {
  IconGithub,
  IconDev,
  IconInstagram,
  IconLinkedIn,
  IconNomadList
} from "@components/Icons";

export default function Home() {
  return (
    <FullscreenNoScrollLayout>
      {/* <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} /> */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          overflow: "hidden"
        }}
      >
        <Heading
          as="h1"
          sx={{
            fontSize: [0, "1.325rem", "1.35rem"],
            fontFamily: "monospace",
            fontWeight: "normal",
            fontFeatureSettings: "'ss01'",
            lineHeight: 2.4,
            color: "accent",
            marginLeft: ["1.8px", 1]
          }}
        >
          Hi, my name is
        </Heading>
        <Heading
          sx={{
            fontFamily: 'body',
            fontSize: [1, 2],
            lineHeight: 1.1,
            color: "bright"
          }}
        >
          Daniel Brady.
        </Heading>
        <Heading
          as="h3"
          sx={{
            fontFamily: 'body',
            fontSize: [1, 2],
            lineHeight: 1.1,
            fontWeight: "normal"
          }}
        >
          I’m&nbsp;
          <Link variant="external" href="https://prodperfect.com">
            a software mechanic.
          </Link>
        </Heading>

        <section
          sx={{
            marginTop: [5, 7]
          }}
        >
          <IconGithub />
          <IconDev />
          <IconLinkedIn />
          <IconInstagram />
          <IconNomadList />
        </section>
      </Box>
    </FullscreenNoScrollLayout>
  );
}
