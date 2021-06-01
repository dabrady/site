/** @jsxImportSource theme-ui */

import { useThemeUI } from "theme-ui";

export default function Connecticon({ children, link }) {
  var {
    theme: {
      sizes: { icon }
    }
  } = useThemeUI();
  return (
    <a
      href={link}
      sx={{
        display: "inline-block",
        marginRight: [5, 8],
        cursor: "pointer",
        width: icon,
        height: icon,
        svg: {
          fill: "text",
          width: icon,
          height: icon
        },
        ":hover": {
          svg: {
            fill: "accent",
            transitionProperty: "fill",
            transitionDuration: "0.2s"
          }
        }
      }}
    >
      {children}
    </a>
  );
}
