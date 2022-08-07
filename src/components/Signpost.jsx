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
              quality: 100,
              placeholder: BLURRED,
              layout: FULL_WIDTH
            )
          }
        }
        litSignpost: file(relativePath: { eq: "images/full_signpost_lit.png" }) {
          childImageSharp {
            gatsbyImageData(
              quality: 100,
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
      // precedence over Theme UI's `sx` styling mechanism. As a result, I need to use `!important`.
      sx={{
        height: '100vh',
        // unlit
        '&:before': {
          opacity: backgroundImage == unlitSignpost ?
            // NOTE(dabrady) The 'unlit signpost' image has a blanket impact on readability, so I'm
            // drastically lowering its opacity across the board.
            '0.125 !important'
            : '0 !important'
        },
        // lit
        '&:after' : {
          opacity: backgroundImage == unlitSignpost ?
            '0 !important'
            // NOTE(dabrady) At some breakpoints the text overlaps the image, harming readability.
            // So I'm adjusting the opacity at those points as a simple remedy.
            : [ '1 !important', '0.625 !important', '0.625 !important', '1 !important' ]
        },
        '&:before, &:after': {
          // NOTE(dabrady) At some breakpoints the image is a bit to far off-screen, so I'm adjusting
          // the position a bit to compensate.
          backgroundPosition: [
            'right -115px top !important',
            'right top !important',
          ]
        }
      }}
    >
      {children}
    </BackgroundImage>
  );
}
