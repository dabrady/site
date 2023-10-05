import { graphql, useStaticQuery } from 'gatsby';

export default function useSiteMetadata() {
  var { site: { siteMetadata } } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

  return siteMetadata;
}
