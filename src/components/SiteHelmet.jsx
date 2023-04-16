import { useStaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { Global } from "theme-ui";

import theme from '@styles/theme';

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
      <Global styles={theme.globals}/>
    </>
  );
}
