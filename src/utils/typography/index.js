import Typography from "typography";
import lincoln from "typography-theme-lincoln";

import darkness, { scaleRatio } from "@utils/themes/darkness";

const { header, link, body } = darkness.colors;
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
