import React from "react";
/** @jsx jsx */
import { Box, Heading, useColorMode, jsx } from "theme-ui";

import MainLayout from "@components/MainLayout";
// import SEO from "@components/SEO.jsx";
import {
  IconGithub,
  IconDev,
  IconInstagram,
  IconLinkedIn
} from "@components/Icons";

export default function Home() {
  var [colorMode, setColorMode] = useColorMode();
  function otherMode() {
    return (colorMode == "default" && "dark") || "default";
  }

  return (
    <MainLayout>
      {/* <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} /> */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0
        }}
      >
        <Heading
          as="h1"
          sx={{
            fontSize: ["0.8rem", 0],
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
            /* fontSize: "80px", */
            fontSize: [1, 2, 3, 4],
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
            /* fontSize: "80px", */
            fontSize: [1, 2, 3, 4],
            lineHeight: 1.1,
            fontWeight: "normal",
            margin: "0 0 10px"
          }}
        >
          I build better software
          {/* NOTE(dabrady) Secret theme toggle */}
          <span
            sx={{
              cursor: "pointer",
              ":hover": {
                color: "accent",
                transitionProperty: "color",
                transitionDuration: "0.2s"
              }
            }}
            onClick={() => setColorMode(otherMode())}
          >
            .
          </span>
        </Heading>

        <section
          sx={{
            marginTop: "22px",
            marginLeft: "-10px"
            /* TODO Implement responsive design */
          }}
        >
          <IconGithub size="80px" />
          <IconDev size="80px" />
          <IconLinkedIn size="80px" />
          <IconInstagram size="80px" />
        </section>
      </Box>
    </MainLayout>
  );
}
