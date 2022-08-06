/** @jsxImportSource theme-ui */

import React, { useCallback, useState } from "react";
import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import { BgImage as BackgroundImage } from 'gbimage-bridge';
import useSystemTheme, { Modes } from '@utils/hooks/useSystemTheme';

export default function Signpost({children}) {
  var { unlitSignpost, litSignpost } = useStaticQuery(graphql`
      query {
        unlitSignpost: file(relativePath: { eq: "images/full_signpost_unlit.png" }) {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED,
              layout: FULL_WIDTH
            )
          }
        }
        litSignpost: file(relativePath: { eq: "images/full_signpost_lit.png" }) {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED,
              layout: FULL_WIDTH
            )
          }
        }
      }
    `);

  var [backgroundImage, setBackgroundImage] = useState(unlitSignpost);
  useSystemTheme(useCallback(function selectImage(mode) {
    switch(mode) {
      case Modes.DARK: {
        if ( backgroundImage != litSignpost ) {
          setBackgroundImage(litSignpost);
        }
        return;
      }
      case Modes.LIGHT: {
        if ( backgroundImage != unlitSignpost ) {
          setBackgroundImage(unlitSignpost);
        }
        return;
      }
      default: break;
    }
  }, [backgroundImage, setBackgroundImage, unlitSignpost, litSignpost]));

  return (
    <BackgroundImage
      image={getImage(backgroundImage)}
      // NOTE(dabrady) This is silly, but a quirk of the `BackgroundImage` component is that
      // under the hood it applies an inline style attribute to the image tag, which takes
      // precedence over Theme UI's `sx` styling mechanism.
      style={{
        backgroundPosition: 'left top'
      }}
      sx={{ height: '100vh' }}
    >
      {children}
    </BackgroundImage>
  );
}
