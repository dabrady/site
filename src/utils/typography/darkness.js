import lincoln from "typography-theme-lincoln";
import gray from "gray-percentage";

export const linkColor = "hsla(204, 38%, 64%, 1)";
export const headerColor = gray(90, 0, true);
export const bodyColor = gray(73, 0, true);
export const backgroundColor = "#282828";
// const dark = "hsla(0, 0%, 16%, 1)";

const darkness = {
  /* TODO Parameterize this. */
  ...lincoln,

  headerColor,
  bodyColor,
  overrideThemeStyles: () => ({
    body: { backgroundColor },
    a: {
      color: linkColor,
      backgroundImage: null,
      textShadow: null
      // backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${linkColor} 1px, ${linkColor} 2px, rgba(0, 0, 0, 0) 2px)` // eslint-disable-line
      // textShadow: `.03em 0 ${dark},-.03em 0 ${dark},0 .03em ${dark},0 -.03em ${dark},.06em 0 ${dark},-.06em 0 ${dark},.09em 0 ${dark},-.09em 0 ${dark},.12em 0 ${dark},-.12em 0 ${dark},.15em 0 ${dark},-.15em 0 ${dark}` // eslint-disable-line
    }
  })
};

export default darkness;
