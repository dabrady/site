import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import SunCalc from "suncalc";
import { StaticQuery, graphql, useStaticQuery } from "gatsby";
import Image from "gatsby-image";

const StyledFullScreenWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

/* const objects = nightmode
 *               ? [mobilePortraitNight, mobileLandscapeNight, gatsby, desktopNight]
 *               : [mobilePortrait, mobileLandscape, gatsby, desktop]; */

const mediaQueries = {
  mobilePortrait: undefined,
  mobileLandscape: `only screen and
            /* Device dimensions and orientation */
            /* (min-device-width: 665px) */
            /* and (min-device-height: 375px) */
            /* and (orientation: landscape), */

            /* vs. */

            /* Viewport dimensions */
            (min-width: 665px)
            and (min-height: 375px)
            and (max-width: 768px)
            and (max-height: 408px)`,
  desktop: "only screen and (min-width: 1500px)",
  everythingElse: "only screen and (min-width: 768px) and (max-width: 1500px)"
};

const SignPost = ({ children }) => {
  const {
    gatsby,

    mobileLandscape,
    mobileLandscapeNight,

    mobilePortrait,
    mobilePortraitNight,

    tabletPortrait,
    tabletPortraitNight,

    desktop,
    desktopNight
  } = useStaticQuery(graphql`
    query {
      gatsby: file(relativePath: { eq: "images/gatsby-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 512, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ### MOBILE ###
      mobileLandscape: file(
        relativePath: { eq: "images/sign_post/wip_iphone_landscape.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1334, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mobileLandscapeNight: file(
        relativePath: { eq: "images/sign_post/wip_iphone_landscape_night.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1334, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mobilePortrait: file(
        relativePath: { eq: "images/sign_post/wip_iphone_portrait.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 750, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      mobilePortraitNight: file(
        relativePath: { eq: "images/sign_post/wip_iphone_portrait_night.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 750, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      ### TABLET ###
      # TODO Need landscape versions!
      tabletPortrait: file(
        relativePath: { eq: "images/sign_post/wip_ipad_portrait.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1668, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      tabletPortraitNight: file(
        relativePath: { eq: "images/sign_post/wip_ipad_portrait_night.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1668, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      ### DESKTOP ###
      desktop: file(relativePath: { eq: "images/sign_post/wip_desktop.png" }) {
        childImageSharp {
          fluid(maxWidth: 2880, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      desktopNight: file(
        relativePath: { eq: "images/sign_post/wip_desktop_night.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 2880, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  // Determine if it's likely to be dark outside for the user, and swap themes accordingly.
  var [nightmode, setNightmode] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function getSuntimes({
      coords: { latitude, longitude }
    }) {
      const now = new Date();
      const times = SunCalc.getTimes(now, latitude, longitude);
      setNightmode(now < times.dawn || now > times.dusk);
    });
  }, console.error);

  /* const objects = nightmode
   *   ? [mobilePortraitNight, mobileLandscapeNight, gatsby, desktopNight]
   *   : [mobilePortrait, mobileLandscape, gatsby, desktop];
   */
  const sources = nightmode
    ? [
        // Default.
        mobilePortraitNight.childImageSharp.fluid,

        {
          ...mobileLandscapeNight.childImageSharp.fluid,
          media: mediaQueries.mobileLandscape
        },

        // TODO Design for these sizes! Placeholder for now.
        /* {
         *   ...gatsby.childImageSharp.fluid,
         *   media: mediaQueries.everythingElse
         * }, */

        {
          ...desktopNight.childImageSharp.fluid,
          media: mediaQueries.desktop
        }
      ]
    : [
        // Default.
        mobilePortrait.childImageSharp.fluid,

        {
          ...mobileLandscape.childImageSharp.fluid,
          media: mediaQueries.mobileLandscape
        },

        // TODO Design for these sizes! Placeholder for now.
        /* {
         *   ...gatsby.childImageSharp.fluid,
         *   media: mediaQueries.everythingElse
         * }, */

        {
          ...desktop.childImageSharp.fluid,
          media: mediaQueries.desktop
        }
      ];
  return (
    <StyledFullScreenWrapper>
      <Image
        Tag="section"
        role="img"
        fluid={sources}
        css={css`
          z-index: -1;
          width: 100%;
          // max-width: 1580px;
          // height: 100%;
          & img {
            object-position: 0% 0% !important;
          }
        `}
      />

      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          & > h1 {
            color: red;
          }
        `}
      >
        {children}
      </div>
    </StyledFullScreenWrapper>
  );
};
export default SignPost;
