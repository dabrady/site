/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import { rhythm } from "../utils/typography";

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
      <div
        css={css`
          margin: ${rhythm(3.4)} auto;
          max-width: 900px;
          padding: ${rhythm(2)};
          padding-top: ${rhythm(1.5)};
        `}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>{data.site.siteMetadata.title}</title>
          <link href="https://daniel13rady.com/" rel="canonical" />
        </Helmet>
        {children}
      </div>
    )}
  />
);
