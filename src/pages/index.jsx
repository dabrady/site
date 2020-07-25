import React from "react";
/** @jsx jsx */
import { Box, Heading, useColorMode, jsx } from "theme-ui";

import MainLayout from "@components/MainLayout";
import SEO from "@components/SEO";
import { IconGithub, IconInstagram, IconLinkedIn } from "@components/Icons";

export default function Home({ data }) {
  var [colorMode, setColorMode] = useColorMode();
  // setColorMode("dark");
  setColorMode("default");
  return (
    <MainLayout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Box
        sx={{
          position: "relative",
          height: "100%"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "30vh"
          }}
        >
          <Heading
            as="h1"
            sx={{
              fontSize: 0,
              fontFamily: "monospace",
              fontWeight: "normal",
              fontFeatureSettings: "'ss01'",
              lineHeight: 1.1,
              color: "accent",
              margin: "0 0 10px 3px"
            }}
          >
            Hi, my name is
          </Heading>
          <Heading
            sx={{
              fontSize: "80px",
              lineHeight: 1.1,
              color: "bright",
              margin: "0"
            }}
          >
            Daniel Brady.
          </Heading>
          <Heading
            as="h3"
            sx={{
              fontSize: "80px",
              lineHeight: 1.1,
              fontWeight: "normal",
              margin: "0 0 10px"
            }}
          >
            I am not a web developer.
          </Heading>

          <section sx={{ marginTop: "22px" }}>
            <IconGithub size="80px" />
            <IconLinkedIn size="80px" />
            <IconInstagram size="80px" />
          </section>
        </Box>
      </Box>
    </MainLayout>
  );
}
