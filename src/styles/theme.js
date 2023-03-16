import chroma from "chroma-js";
import gray from "gray-percentage";
import { alpha } from "@theme-ui/color";
import * as T from "@utils/typography";

import "@styles/fonts.css";

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
   @see https://theme-ui.com/color-modes

   Key         Description
   -----------------------
   text        Body foreground color
   background  Body background color
   primary     Primary brand color for links, buttons, etc.
   secondary   A secondary brand color for alternative styling
   accent      A contrast color for emphasizing UI
   highlight   A background color for highlighting text
   muted       A faint color for backgrounds, borders, and accents that do not require high contrast with the background
               color

   [CUSTOM]
   blackWhiteMono  Black or white, depending on what has the most contrast in this mode
*/
const modes = {
  day: {
    text: palette.black,
    background: palette.softWhite,
    accent: palette.red,
    bright: palette.black,
    muted: chroma(palette.red)
      .brighten()
      .alpha(0.07)
      .css(),
    shadow: palette.black,
    blackWhiteMono: palette.black,
    /* Unspecified  */
    // primary,
    // secondary,
    // highlight,
  },

  night: {
    text: palette.softGray,
    background: chroma(palette.black)
      .brighten(0.3)
      .css(),
    accent: chroma(palette.red)
      .saturate(0.125) // make it stand out a bit better in the dark
      .css(),
    bright: palette.white,
    muted: chroma(palette.red)
      .brighten()
      .alpha(0.07)
      .css(),
    shadow: palette.black,
    blackWhiteMono: palette.white,
    // primary,
    // secondary,
    // highlight,
  },
};
/* Configure 'system' themes */
modes.default = modes.day;
modes.light = modes.day;
modes.dark = modes.night;

/**
   I'm using Theme UI.
   @see https://theme-ui.com/theme-spec
 */
const theme = {
  /** Theme UI configuration */
  // @see https://theme-ui.com/theming#configuration-flags
  config: {
    useColorSchemeMediaQuery: 'system',
  },

  /** Custom attributes **/

  baseline: T.BASELINE,
  scaleRatio: T.SCALE_RATIO,

  /** Theme Specification **/

  fonts: {
    body: "concourse-text, sans-serif",
    heading: "advocate-c43, serif",
    // heading: "advocate-c43",
    // title: "advocate-c43, serif",
    monospace: "triplicate-text, monospace",
    code: "triplicate-code, monospace"
  },
  fontWeights: {
    body: "normal",
    heading: "bolder",
    bold: "bold"
  },

  lineHeights: {
    body: T.LINE_HEIGHTS[0],
    heading: T.LINE_HEIGHTS[1]
  },
  letterSpacings: {},

  colors: {
    ...palette, // Expose color palette
    ...modes.default, // Default color mode
    modes, // Other possible color modes
  },

  breakpoints: ["40rem", "42rem", "56rem"],
  // fontSizes: T.FONT_SIZES,
  // TODO(dabrady) Add a "small text" size (~0.875rem) and slightly larger normal text size (~1.3rem)
  fontSizes: ["1rem", "2.2rem", "4rem", "4.4rem", "5rem"],
  space: T.SPACES,

  sizes: {
    container: "85vw",
    icon: [40, 60, 80]
  },

  /** Variants */

  text: {
    default: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: 0
    },
    code: {
      color: "text",
      fontFamily: 'code',
      fontWeight: "body",
      lineHeight: "body",
      // Slightly smaller than the body text
      fontSize: '0.875rem',
      // Muted highlight
      backgroundColor: "muted",
      color: "bright",
      borderRadius: "8px"
    },
    heading: {
      color: "text",
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [1, 1, 2, 2]
    },
    littleMessage: {
      color: "text"
      // Just slightly smaller than the main body text
      // TODO(dabrady) Just make this font size available in `fontSizes`
      // fontSize: t => `calc(${t.fontSizes[t.text.default.fontSize]} * 0.6)`
    },
    input: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: 0,

      backgroundColor: "transparent",
      width: "100%",
      padding: "11px 15px 11px 0",

      animation: "1ms void-animation-out",
      appearance: "none",
      outline: "none",
      borderStyle: "none",

      ":-webkit-autofill": {
        "WebkitTextFillColor": ({ colors }) => colors.text,
        background: "transparent !important",
        transition: "background-color 100000000s",
        "WebkitAnimation": "1ms void-animation-out"
      },

      "::placeholder": {
        color: alpha("accent", 0.6)
      }
    }
  },

  layout: {
    container: {
      maxWidth: ["85vw"],
      maxHeight: ["100vh"],
      margin: ["1rem auto", "1.2rem auto", "2.86rem auto", "4.93rem auto"]
    }
  },

  progress: {
    default: {
      color: "accent",
      display: "inline-block"

      /* Playing with SVG animation */
      // "circle[stroke-dasharray]": {
      //   strokeDasharray: 100,
      //   animation: "dash 5s linear",
      //   "@keyframes dash": {
      //     to: {
      //       strokeDashoffset: 1000
      //     }
      //   }
      // }
    }
  },

  buttons: {
    disabled: {
      fontFamily: "title",
      fontWeight: "body",
      fontFeatureSettings: "'c2sc'",
      lineHeight: "body",
      backgroundColor: "muted",
      color: "text"
      // margin: "25px auto"
    },
    primary: {
      fontFamily: "title",
      fontWeight: "body",
      lineHeight: "body",
      backgroundColor: "accent",
      color: "background",
      fontFeatureSettings: "'c2sc'"
      // margin: "25px auto"
    },
    secondary: {
      fontFamily: "title",
      fontWeight: "body",
      lineHeight: "body",
      backgroundColor: "muted",
      color: "accent",
      fontFeatureSettings: "'c2sc'"
      // margin: "25px auto"
    }
  },

  links: {
    local: {
      color: "text",
      cursor: "pointer",
      textTransform: "lowercase",
      fontFamily: function smallCapsVariant({ fonts: { body } }) {
        var [intendedFont, ...fallbacks] = body.split(", ");
        return `${intendedFont.replace("-text", "-caps")}, ${fallbacks}`;
      },
      fontFeatureSettings: "'c2sc'",
      // letterSpacing: "0.1em",
      backgroundImage: null,
      textShadow: null,
      ":hover": {
        backgroundColor: "muted",
        color: "bright",
        transitionProperty: "background, color",
        transitionDuration: "0.2s",
        borderRadius: "8px"
      }
    },
    external: {
      color: "text",
      cursor: "pointer",
      backgroundImage: null,
      textShadow: null,
      textDecoration: 'none',
      marginLeft: '-2px',
      paddingLeft: '-2px',
      paddingRight: '2px',
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
        color: "bright",
        transitionProperty: "background, color",
        transitionDuration: "0.2s",
        borderRadius: "8px"
      }
    }
  }
};

// Use variants in MDX for unified style.
theme.styles = {
  p: theme.text.default,
  a: theme.links.external, // default to external since we don't know at this point
  h1: theme.text.heading,
  h2: theme.text.heading,
  h3: theme.text.heading,
  h4: theme.text.heading,
  h5: theme.text.heading,
  h6: theme.text.heading,
  code: theme.text.code,
};

export default theme;
