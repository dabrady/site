import { fontSizes, spaces } from "@utils/typography/calculations";
import colors from "@utils/themes/colors";

// A 'golden ratio'
export const scaleRatio = 1.618;
const theme = {
  fontSizes: fontSizes(scaleRatio),
  space: spaces(scaleRatio),
  colors: {
    background: colors.charcoal,
    body: colors.dirtysnow,
    link: colors.icyblue,
    header: colors.softwhite
  }
};
export default theme;
