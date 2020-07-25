import { Global } from "@emotion/core";
import { Box } from "theme-ui";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import React from "react";
import styled from "@emotion/styled";

export default function MainLayout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={function render(data) {
        return (
          <Box
            sx={{
              display: "block",
              position: "absolute",
              height: "auto",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              maxHeight: "100vh",
              overflow: "hidden",
              maxWidth: "85vw",
              margin: "4.93rem auto"
            }}
          >
            {/* TODO Due to a bug whose fix is not yet published, I need to use the
                 props method of passing children to Helmet: I run into this stack
                 overflow if I scroll through posts too fast.
                 https://github.com/nfl/react-helmet/issues/373 */}
            <Helmet
              meta={[{ charSet: "utf-8" }]}
              title={data.site.siteMetadata.title}
              link={[{ href: "https://daniel13rady.com/", rel: "canonical" }]}
            />
            <Global
              styles={{
                body: {}
              }}
            />
            {children}
          </Box>
        );
      }}
    />
  );
}
