/** @jsxImportSource theme-ui */

import { Box } from "theme-ui";

export default function ThemedSvg({
  children,
  width,
  height,
  // fillColor = "text",
  fillColor = "text",
  customStyle = {},
}) {
  return (
    <Box
      sx={{
        display: "inline",
        marginRight: 0,//[5, 8],
        width,
        height,
        svg: {
          fill: fillColor,
          width,
          height,
        },
        ...customStyle
      }}
    >
      {children}
    </Box>
  );
}
