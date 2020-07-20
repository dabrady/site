import { fontSizes, spaces } from "@utils/typography/calculations";

// A 'golden ratio'
export const scaleRatio = 1.618;
const theme = {
  fontSizes: fontSizes(scaleRatio),
  space: spaces(scaleRatio)
};
export default theme;
