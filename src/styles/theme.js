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
  softGray: chroma("#d5d5d5").css(),
  gray: chroma("#9b9b9b").css(),
  hardGray: chroma("#667").css(),
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
    aside: palette.hardGray,
    heading: palette.black,
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
    aside: palette.gray,
    heading: chroma(palette.red)
      .saturate(0.125) // make it stand out a bit better in the dark
      .css(),
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
    body: "valkyrie-text, serif",
    informal: "concourse-text, sans-serif",
    heading: "valkyrie-text, serif",
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

  breakpoints: ["520px", "1000px"],
  // fontSizes: T.FONT_SIZES,
  fontSizes: ["1rem", "3rem", "4rem", "4.4rem", "5rem"],
  space: T.SPACES,

  sizes: {
    icon: [40, 60, 80]
  },

  /** Variants */
  globals: {
    '*': {
      padding: 0,
      margin: 0,
    },

    html: {
      fontSize: ['18px', '2.4vw', '24px']
    },

    aside: { variant: 'aside' },

    body: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
      maxWidth: '1000px',
      minHeight: '100vh; min-height: -webkit-fill-available',
    },

    li: {
      variant: 'text.body',
      marginBottom: '1em',
      marginLeft: '2.5rem',
      listStyle: 'none',
    },
    'li:before': {
      content: '"→"',
      position: 'absolute',
      marginLeft: '-2.5rem',
    },

    p: {
      variant: 'text.body',
      marginBottom: '1em',
      '&:has(+ aside)': {
        float: 'left',
        width: '100%',
      }
    },

    small: {
      variant: 'text.body',
      fontSize: '0.83rem'
    },
  },

  text: {
    body: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
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
    monospace: {
      color: "text",
      fontFamily: "monospace",
      fontWeight: "body",
      lineHeight: "body",
    },
    heading: {
      color: "heading",
      fontFamily: "heading",
      fontWeight: "heading",
      fontStyle: 'italic',
      lineHeight: "heading",
      fontSize: '125%',
      marginBottom: '0.4rem',
    },
    smallerHeading: {
      variant: 'text.heading',
      fontStyle: 'normal',
      fontSize: 0,
      fontFamily: smallCaps('body'),
    },
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
      textDecoration: 'none',
      fontFamily: 'concourse-caps, sans-serif',
      fontFeatureSettings: "'c2sc'",
      backgroundImage: null,
      textShadow: null,
      padding: '0 0.2rem 0.2rem 0.2rem',
      ":hover, :focus": {
        backgroundColor: "muted",
        color: "bright",
        transitionProperty: "background, color",
        transitionDuration: "0.2s",
        borderRadius: "8px",
      }
    },
    external: {
      color: "text",
      cursor: "pointer",
      backgroundImage: null,
      textShadow: null,
      textDecoration: 'none',
      marginLeft: '-2px',
      paddingLeft: '2px',
      paddingRight: '2px',
      // Cloning link style from pracicaltypography.com
      "::after": {
        content: "'°'",
        marginLeft: "0.15rem",
        top: "-0.1em",
        fontSize: "90%",
        color: "accent"
      },
      ":hover, :focus": {
        backgroundColor: "muted",
        color: "bright",
        transitionProperty: "background, color",
        transitionDuration: "0.2s",
        borderRadius: "8px"
      }
    }
  },

  forms: {
    label: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },

    input: {
      color: "text",
      fontFamily: "monospace",
      fontWeight: "body",
      lineHeight: "body",

      backgroundColor: "transparent",
      width: "100%",
      padding: '0',
      marginLeft: '1.2rem',

      animation: "1ms void-animation-out",
      appearance: "none",
      outline: "none",
      borderStyle: "none",
      caretColor: "accent",

      ":-webkit-autofill": {
        "WebkitTextFillColor": ({ colors }) => colors.text,
        background: "transparent !important",
        transition: "background-color 100000000s",
        "WebkitAnimation": "1ms void-animation-out"
      },

      "::placeholder": {
        color: alpha("accent", 0.6)
      }
    },
  },

  aside: {
    display: 'block',
    position: ['inherit', 'absolute'],
    float: ['inherit', 'left'],
    left: '2.5rem',
    boxSizing: 'content-box',
    marginBottom: '1rem',
    padding: ['0.3rem 0.5rem', '0.2rem 0'],

    border: ['1px solid #ccc', 'none'],
    borderLeft: ['3px solid #ccc', 'none'],

    width: ['90%', 'calc(2.5rem * 3)'],
    '@media screen and (min-width: 1200px)': {
      left: '0',
      width: 'calc(2.5rem * 4)',
    },

    textAlign: ['left', 'right'],
    clear: 'both',

    p: {
      fontSize: '0.83rem',
      lineHeight: 1.4,
      letterSpacing: '0.015em',
      color: 'aside',
      ':last-child': {
        marginBottom: ['0'],
      }
    }
  },

  treelistItem: {
    marginBottom: 0,
    marginLeft: '0.4rem',
    paddingLeft: '2.5rem',
    paddingBottom: ['0.6rem', '0.4rem'],
    borderLeft: '1px solid',
    "&:first-of-type": {
      paddingTop: '0.4rem',
    },
    "&:nth-last-of-type(2)": {
      paddingBottom: ['1.45rem', '1.25rem'],
    },
    "&:last-child": {
      marginTop: '-0.85rem',
      marginLeft: 'calc(0.4rem + 1px)',
      borderLeft: 'none',
    },
    "&:only-child": {
      margin: '0 0.4rem',
      borderLeft: '1px solid',
    },
    "&::before": {
      content: '"——"',
      marginLeft: '-2.6rem',
      letterSpacing: '-0.2rem',
    },
  },

  /** Default Markdown styles */
  // NOTE(dabrady) This is an exhaustive list of all supported Markdown elements.
  // Any other HTML elements must be used explicitly as such in Markdown files,
  // and those styles are defined above in `theme.globals`.
  styles: {
    a: {},
    blockquote: {
      marginTop: '1.5rem',
      marginBottom: '1.5rem',
      padding: '1rem 1rem 0.5rem 1rem',
      borderLeft: '3px solid #ccc',
      fontStyle: 'italic',
    },
    br: {},
    code: { variant: 'text.code' },
    del: {},
    em: {},
    h1: { variant: 'text.heading' },
    h2: { variant: 'text.smallerHeading' },
    h3: { variant: 'text.smallerHeading' },
    h4: { variant: 'text.smallerHeading' },
    h5: { variant: 'text.smallerHeading' },
    h6: { variant: 'text.smallerHeading' },
    hr: {},
    inlineCode: {}, // MDX alias for `code` tags outside of a `pre` tag
    img: {},
    li: {},
    ol: {},
    p: {},
    pre: {},
    strong: {},
    table: {},
    td: {},
    th: {},
    tr: {},
    ul: {},
  },
};

// Theme variant aliases
theme.text.default = theme.text.body;

// HTML & MDX tag Aliases
theme.styles.b = theme.styles.strong;
theme.styles.i = theme.styles.em;
theme.styles.thematicBreak = theme.styles.hr; // MDX alias for `hr`

export function smallCaps(font) {
  return function({ fonts }) {
    var [intendedFont, ...fallbacks] = fonts[font].split(", ");
    return `${intendedFont.replace("-text", "-caps")}, ${fallbacks}`;
  };
}

export default theme;
