import React from "react";
/** @jsx jsx */
import { Heading, Link, Text, useColorMode, jsx } from "theme-ui";
import { alpha } from "@theme-ui/color";

import MainLayout from "@components/MainLayout";
import SEO from "@components/SEO";

export default function Home({ data }) {
  var [colorMode, setColorMode] = useColorMode();
  // setColorMode("dark");
  return (
    <MainLayout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Heading
        as="h1"
        sx={{
          fontSize: 0,
          fontFamily: "monospace",
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
          fontWeight: 600,
          lineHeight: 1.1,
          color: "highlight",
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
          margin: "0 0 10px",
          color: alpha("text", 0.5)
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
        Here is <Link variant={"external"}>link that goes elsewhere</Link> if
        you click it.
      </Text>
    </MainLayout>
  );
}
