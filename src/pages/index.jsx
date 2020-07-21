import React from "react";
/** @jsx jsx */
import { useColorMode, jsx } from "theme-ui";
import { alpha } from "@theme-ui/color";

import MainLayout from "@components/MainLayout";
import SEO from "@components/SEO";

export default function Home({ data }) {
  var [colorMode, setColorMode] = useColorMode();
  // setColorMode("dark");
  return (
    <MainLayout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <h1
        sx={{
          fontSize: 0,
          fontFamily: "monospace",
          color: "accent",
          margin: "0 0 10px 3px"
        }}
      >
        Hi, my name is
      </h1>
      <h2
        sx={{
          fontFamily: "heading",
          fontSize: "80px",
          fontWeight: "600",
          lineHeight: "1.1",
          color: "highlight",
          margin: "0"
        }}
      >
        Daniel Brady.
      </h2>
      <h3
        sx={{
          fontFamily: "heading",
          fontSize: "80px",
          fontWeight: 600,
          lineHeight: 1.1,
          margin: "0 0 10px",
          color: alpha("text", 0.5)
        }}
      >
        I am not a web developer.
      </h3>
      <p
        sx={{
          fontFamily: "body",
          fontSize: 1,
          color: "text"
        }}
      >
        Here is{" "}
        <a sx={{ variant: "links.external" }}>link that goes elsewhere</a> if
        you click it.
      </p>
    </MainLayout>
  );
}
