import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const SignPost = ({ nightmode = false }) => (
  <StaticQuery
    query={graphql`
      query {
        ### MOBILE ###
        mobileLandscapeImage: file(
          relativePath: { eq: "images/sign_post/iphone_landscape.png" }
        ) {
          childImageSharp {
            fixed(width: 1334, height: 750, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        mobileLandscapeNightImage: file(
          relativePath: { eq: "images/sign_post/iphone_landscape_night.png" }
        ) {
          childImageSharp {
            fixed(width: 1334, height: 750, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        mobilePortraitImage: file(
          relativePath: { eq: "images/sign_post/iphone_portrait.png" }
        ) {
          childImageSharp {
            fixed(width: 750, height: 1334, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        mobilePortraitNightImage: file(
          relativePath: { eq: "images/sign_post/iphone_portrait_night.png" }
        ) {
          childImageSharp {
            fixed(width: 750, height: 1334, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }

        ### TABLET ###
        # TODO Need landscape versions!
        tabletPortraitImage: file(
          relativePath: { eq: "images/sign_post/ipad_portrait.png" }
        ) {
          childImageSharp {
            fixed(width: 1668, height: 2224, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        tabletPortraitNightImage: file(
          relativePath: { eq: "images/sign_post/ipad_portrait_night.png" }
        ) {
          childImageSharp {
            fixed(width: 1668, height: 2224, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }

        ### DESKTOP ###
        desktopImage: file(
          relativePath: { eq: "images/sign_post/desktop.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 2880, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        desktopNightImage: file(
          relativePath: { eq: "images/sign_post/desktop_night.png" }
        ) {
          childImageSharp {
            fluid(maxWidth: 2880, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => {
      console.log(data);
      const sources = nightmode
        ? [
            {
              ...data.desktopNightImage.childImageSharp.fluid
            }
          ]
        : [
            {
              ...data.desktopImage.childImageSharp.fluid
            }
          ];
      return (
        <Img
          fluid={sources}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw"
          }}
        />
      );
    }}
  />
);
export default SignPost;
