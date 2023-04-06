import { Global } from "@emotion/react";

import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

export default function SiteHelmet() {
  var {
    site: {
      siteMetadata: {
        title,
        baseUrl
      }
    }
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          baseUrl
        }
      }
    }
  `);

  return (
    <>
      <Helmet
        meta={[{ charSet: "utf-8" }]}
        title={title}
        link={[{ href: baseUrl, rel: "canonical" }]}
      />
      <Global
        styles={{
          html: { height: "-webkit-fill-available" },
          body: {
            minHeight: "100vh; min-height: -webkit-fill-available"
          }
        }}
      />
    </>
  );
}
