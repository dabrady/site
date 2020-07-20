import chroma from "chroma-js";
import _ from "lodash";
import Typography from "typography";
import CodePlugin from "typography-plugin-code";
import lincoln from "typography-theme-lincoln";

import t from "@utils/themes/darkness";
export const theme = t;
const typography = new Typography();

applyTheme(theme);
export default typography;
export const { scale, rhythm } = typography;

export function updateTypography(opts) {
  _.merge(typography.options, opts);
  typography.injectStyles();
}

export function applyTheme(theme) {
  const { header, accent, body, background } = theme.colors;
  const { scaleRatio } = theme;
  updateTypography({
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
        background: chroma(accent)
          .brighten()
          .alpha(0.2)
          .css(),
        color: theme.colors.header,
        transitionProperty: "background, color",
        transitionDuration: "0.2s",
        borderRadius: "8px"
      }
    })
  });
}
