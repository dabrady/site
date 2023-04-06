/** @jsxImportSource theme-ui */
import { Global } from "@emotion/react";
import { Container } from "theme-ui";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export default function MainLayout({ children }) {
  var {
    site: {
      siteMetadata: {
        title
      }
    }
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

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
        title={title}
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
}
