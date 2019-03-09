import Typography from "typography";
import darkness, { scaleRatio } from "../themes/darkness";
import lincoln from "typography-theme-lincoln";

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
