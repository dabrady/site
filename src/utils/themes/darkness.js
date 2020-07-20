import chroma from "chroma-js";

import base from "@utils/themes/base";
import colors from "@utils/themes/colors";

const theme = {
  ...base,
  colors: {
    background: chroma(colors.Black)
      .brighten(0.3)
      .hex(),
    header: colors.SoftWhite,
    body: colors.SoftGray,
    accent: colors.IcyBlue
  }
};
export default theme;
