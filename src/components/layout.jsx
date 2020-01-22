import { Helmet } from "react-helmet";
import { StaticQuery, graphql, useStaticQuery } from "gatsby";
import React from "react";

import SignPost from "@components/sign_post";

export default ({ children }) => {
  const {
    site: {
      siteMetadata: { title, siteAddr }
    }
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteAddr
        }
      }
    }
  `);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link href={siteAddr} rel="canonical" />
      </Helmet>

      <SignPost>{children}</SignPost>
    </div>
  );
};
