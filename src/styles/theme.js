import chroma from "chroma-js";
import gray from "gray-percentage";
import { fontSizes, spaces } from "@utils/typography";

import "@styles/fonts.css";

// A 'golden ratio'
const scaleRatio = 1.618;
// NOTE(dabrady) Leveraging Chroma here to unify color 'type' specifications.
const palette = {
  black: chroma("#000").css(),
  white: chroma("#fff").css(),
  red: chroma("#933").css(),
  charcoal: chroma("#282828").css(),
  softGray: chroma("#9b9b9b").css(),
  icyBlue: chroma("#00b7ff").css(),
  softWhite: chroma(gray(90, 0, true)).css(),
  dirtySnow: chroma(gray(73, 0, true)).css()
};

/**
   I'm using Theme UI.
   @see https://theme-ui.com/theme-spec
 */
export default {
  /**
     Theme UI configuration
     @see https://theme-ui.com/theming#configuration-flags
  */

  // THIS PAGE LEFT INTENTIONALLY BLANK

  /*******/

  breakpoints: [],
  space: spaces(scaleRatio),
  fonts: {
    body: "'Lato', serif",
    heading: "'Lato', serif",
    monospace: "'SF Mono', Monaco, monospace"
  },
  fontSizes: fontSizes(scaleRatio),
  fontWeights: {
    // body,
    // heading,
    // bold
  },
  lineHeights: {
    // body,
    // heading
  },
  letterSpacings: {},
  /**
     Key         Description
     -----------------------
     text        Body foreground color
     background  Body background color
     primary     Primary brand color for links, buttons, etc.
     secondary   A secondary brand color for alternative styling
     accent      A contrast color for emphasizing UI
     highlight   A background color for highlighting text
     muted       A faint color for backgrounds, borders, and accents
                 that do not require high contrast with the background color
  */
  colors: {
    ...palette,

    text: palette.black,
    background: palette.softWhite,
    // primary,
    // secondary,
    accent: palette.red,
    highlight: palette.black,
    muted: chroma(palette.red)
      .brighten()
      .alpha(0.2)
      .css(),
    modes: {
      dark: {
        text: palette.softGray,
        background: chroma(palette.black)
          .brighten(0.3)
          .css(),
        // primary,
        // secondary,
        accent: palette.icyBlue,
        highlight: palette.white,
        muted: chroma(palette.icyBlue)
          .brighten()
          .alpha(0.2)
          .css()
      }
    }
  },

  /* For styling MDX content */
  // TODO switch to MDX for rendering Markdown
  styles: {},

  /** Variants */

  links: {
    external: {
      color: "text",
      cursor: "pointer",
      backgroundImage: null,
      textShadow: null,
      // Cloning link style from pracicaltypography.com
      "::after": {
        content: "'°'",
        marginLeft: "0.1em",
        top: "-0.1em",
        fontSize: "90%",
        color: "accent"
      },
      ":hover": {
        backgroundColor: "muted",
        color: "highlight",
        transitionProperty: "background, color",
        transitionDuration: "0.2s",
        borderRadius: "8px"
      }
    }
  }
};
