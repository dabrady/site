/** @jsxImportSource theme-ui */

import React, { useCallback, useState } from "react";
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import useSystemTheme, { Modes } from '@utils/hooks/useSystemTheme';

export default function Signpost() {
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
    <GatsbyImage
      image={getImage(backgroundImage)}
      alt=''
      sx={{
        height: '100%',
        width: [ 'calc(100vw * 2)', '100vw' ],
        opacity: backgroundImage == unlitSignpost ?
          // NOTE(dabrady) The 'unlit signpost' image has a blanket impact on readability, so I'm
          // drastically lowering its opacity across the board.
          [ '0.125 !important' ]
          : [ '1 !important' ],
        position: 'absolute',
        margin: 0,
        top: 0,
        right: 0,
        img: {
          objectPosition: 'top right'
        },
        // NOTE(dabrady) At some breakpoints the image is a bit to far off-screen, so I'm adjusting
        // the position a bit to compensate.
        marginRight: [ '-6em', 0 ],
        overflow: 'hidden',
      }}
    />
  );
}
