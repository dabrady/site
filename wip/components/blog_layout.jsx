import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { space, fontSize } from "styled-system";
import React from "react";
import styled from "@emotion/styled";

const Root = styled.div`
  max-width: 900px;
  margin: 4.93rem auto;
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
        {children}
      </Root>
    )}
  />
);
