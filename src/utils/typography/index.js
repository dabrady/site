import Typography from "typography";
import lincoln from "typography-theme-lincoln";

import night, { scaleRatio as nightScale } from "@utils/themes/darkness";
import day, { scaleRatio as dayScale } from "@utils/themes/day";

const theme = day;
const scaleRatio = dayScale;

const { header, link, body } = theme.colors;
const typography = new Typography({
  ...lincoln,
  scaleRatio,
  headerColor: header,
  bodyColor: body,
  overrideThemeStyles: () => ({
    a: {
      color: link,
      backgroundImage: null,
      textShadow: null
    }
  })
});

export default typography;
export const rhythm = typography.rhythm;
