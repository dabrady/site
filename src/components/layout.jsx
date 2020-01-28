import { Global } from "@emotion/core";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { space, fontSize } from "styled-system";
import React from "react";
import styled from "@emotion/styled";

import { rhythm } from "@utils/typography";

const Root = styled.div`
  display: block;
  position: absolute;
  height: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-height: 100vh;
  overflow: hidden;
  max-width: 85vw;
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
      <Root px={[3, 4]}>
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
      </Root>
    )}
  />
);
