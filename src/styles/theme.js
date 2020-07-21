import { theme } from "@utils/typography";
import { fontSizes, spaces } from "@utils/typography/calculations";

// A 'golden ratio'
const scaleRatio = 1.618;

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
    // body,
    // heading,
    // monospace
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
    // text: null,
    background: theme.colors.background,
    // primary,
    // secondary,
    // accent,
    // highlight,
    // muted,
    modes: {}
  },

  /* For styling MDX content */
  // TODO switch to MDX for rendering Markdown
  styles: {}
};
