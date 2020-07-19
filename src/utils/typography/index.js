import Typography from "typography";
import CodePlugin from "typography-plugin-code";
import lincoln from "typography-theme-lincoln";

import darkness, { scaleRatio } from "@utils/themes/darkness";

export const theme = darkness;

const { header, link, body, background } = theme.colors;
// TODO Iterate on this once I have written some actual blog posts.
const typography = new Typography({
  ...lincoln,
  plugins: [new CodePlugin()],
  scaleRatio,
  headerColor: header,
  bodyColor: body,
  bodyFontFamily: ["Lato", "fantasy"],
  overrideThemeStyles: () => ({
    body: {
      backgroundColor: background
    },
    a: {
      color: link,
      backgroundImage: null,
      textShadow: null
    }
  })
});

export default typography;
export const rhythm = typography.rhythm;
