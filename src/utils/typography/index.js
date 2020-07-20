import _ from "lodash";
import Typography from "typography";
import CodePlugin from "typography-plugin-code";
import lincoln from "typography-theme-lincoln";

import { lighten, transparent } from "@utils/themes/colors";
import t from "@utils/themes/darkness";
export const theme = t;

const { scaleRatio } = theme;
const { header, accent, body, background } = theme.colors;
// TODO Iterate on this once I have written some actual blog posts.
const typography = new Typography({
  ...lincoln,
  plugins: [new CodePlugin()],
  scaleRatio,
  headerColor: header,
  bodyColor: body,
  bodyFontFamily: ["fantasy"],
  headerFontFamily: ["fantasy"],
  overrideThemeStyles: () => ({
    body: {
      background
    },
    a: {
      color: body,
      cursor: "pointer",
      backgroundImage: null,
      textShadow: null
    },
    // Cloning link style from pracicaltypography.com
    "a::after": {
      content: "'°'",
      marginLeft: "0.1em",
      top: "-0.1em",
      fontSize: "90%",
      color: accent
    },
    "a:hover": {
      background: transparent(lighten(accent, 0.725), 0.3),
      transitionProperty: "background",
      transitionDuration: "0.2s",
      borderRadius: "8px"
    }
  })
});

export default typography;
export const { scale, rhythm } = typography;

export function updateTypography(opts) {
  _.merge(typography.options, opts);
  typography.injectStyles();
}
