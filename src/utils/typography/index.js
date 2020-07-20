import _ from "lodash";
import Typography from "typography";
import CodePlugin from "typography-plugin-code";
import lincoln from "typography-theme-lincoln";

import colors from "@utils/themes/colors";
import t, { scaleRatio } from "@utils/themes/lightness";

export const theme = t;

const { header, link, body, background } = theme.colors;
// TODO Iterate on this once I have written some actual blog posts.
const typography = new Typography({
  ...lincoln,
  plugins: [new CodePlugin()],
  scaleRatio,
  headerColor: header,
  bodyColor: body,
  bodyFontFamily: ["fantasy"],
  overrideThemeStyles: () => ({
    body: {
      background
    },
    a: {
      color: body,
      backgroundImage: null,
      textShadow: null
    }
  })
});

export default typography;
export const { scale, rhythm } = typography;

export function updateTypography(opts) {
  _.merge(typography.options, opts);
  typography.injectStyles();
}
