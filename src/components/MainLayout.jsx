import { Global } from "@emotion/core";
/** @jsx jsx */
import { Container, jsx } from "theme-ui";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import React from "react";

import useSystemTheme from '@utils/hooks/useSystemTheme';

export default function MainLayout({ children }) {
  useSystemTheme();
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
          <Container
            sx={{
              position: "absolute",
              height: "auto",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
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
                html: { height: "-webkit-fill-available" },
                body: {
                  minHeight: "100vh; min-height: -webkit-fill-available"
                }
              }}
            />
            {children}
          </Container>
        );
      }}
    />
  );
}
