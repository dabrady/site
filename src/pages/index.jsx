import React from "react";
/** @jsx jsx */
import { Box, Heading, Link, Text, useColorMode, jsx } from "theme-ui";

import MainLayout from "@components/MainLayout";
import SEO from "@components/SEO";

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
          {/*
           NOTE(dabrady): As of Theme UI v0.3.1, `Text` does not have a default
           variant. But that will change when this PR is included in a release:
           https://github.com/system-ui/theme-ui/pull/870
         */}
          <Text variant="default" as="p">
            Here is <Link variant="external">link that goes elsewhere</Link> if
            you click it, and <Link variant="local">another</Link> that stays
            here.
          </Text>
        </Box>
      </Box>
    </MainLayout>
  );
}
