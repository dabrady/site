import { fontSizes, spaces } from "@utils/typography/calculations";

// A 'golden ratio'
const scaleRatio = 1.618;
const theme = {
  scaleRatio,
  fontSizes: fontSizes(scaleRatio),
  space: spaces(scaleRatio)
};
export default theme;
