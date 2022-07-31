/** @jsxImportSource theme-ui */

import React from "react";
import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import { BgImage as BackgroundImage } from 'gbimage-bridge';

export default function Signpost({children}) {
  var { backgroundImage } = useStaticQuery(graphql`
      query {
        backgroundImage: file(relativePath: { eq: "images/full_signpost_unlit.png" }) {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED,
              layout: FULL_WIDTH
            )
          }
        }
      }
    `);
  return (
    <BackgroundImage
      image={getImage(backgroundImage)}
      // NOTE(dabrady) This is silly, but a quirk of the `BackgroundImage` component is that
      // under the hood it applies an inline style attribute to the image tag, which takes
      // precedence over Theme UI's `sx` styling mechanism.
      style={{ backgroundPosition: 'left top' }}
      sx={{ height: '100vh' }}
    >
      {children}
    </BackgroundImage>
  );
}
