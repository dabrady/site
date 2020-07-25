import React from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";

export default function Connecticon({ children, size, link }) {
  return (
    <a
      href={link}
      sx={{
        display: "inline-block",
        padding: "0 13px",
        cursor: "pointer",
        width: size,
        height: size,
        svg: {
          fill: "text",
          width: size,
          height: size
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
