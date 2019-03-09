import { Global } from "@emotion/core";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { ThemeProvider } from "emotion-theming";
import { space, fontSize } from "styled-system";
import React from "react";
import styled from "@emotion/styled";

import { rhythm } from "@utils/typography";
import darkness from "@utils/themes/darkness";

const Root = styled.div`
  max-width: 900px;
  margin: ${rhythm(3.4)} auto;
  ${space}
  ${fontSize}
`;

Root.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes
};

export default ({ children }) => (
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
    render={data => (
      <ThemeProvider theme={darkness}>
        <Root px={[3, 4]}>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{data.site.siteMetadata.title}</title>
            <link href="https://daniel13rady.com/" rel="canonical" />
          </Helmet>
          <Global
            styles={{
              body: { backgroundColor: darkness.colors.background }
            }}
          />
          {children}
        </Root>
      </ThemeProvider>
    )}
  />
);
