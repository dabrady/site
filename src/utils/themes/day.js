import { fontSizes, spaces } from "@utils/typography/calculations";
import colors from "@utils/themes/colors";

// A 'golden ratio'
export const scaleRatio = 1.618;
const theme = {
  fontSizes: fontSizes(scaleRatio),
  space: spaces(scaleRatio),
  colors: {
    background: colors.white,
    body: colors.charcoal,
    link: colors.icyblue,
    header: colors.black
  }
};
export default theme;
