import Typography from "typography";
import gray from "gray-percentage";
import lincoln from "typography-theme-lincoln";

// TODO Get this from stylesheet.
// const darkness = "hsla(0, 0%, 16%, 1)";
const linkColor = "hsla(204, 38%, 64%, 1)";
const typography = new Typography({
  ...lincoln,
  headerColor: gray(90, 0, true),
  bodyColor: gray(73, 0, true),
  overrideThemeStyles: () => ({
    a: {
      color: linkColor,
      backgroundImage: null,
      textShadow: null
      // backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${linkColor} 1px, ${linkColor} 2px, rgba(0, 0, 0, 0) 2px)`, // eslint-disable-line
      // textShadow: `.03em 0 ${darkness},-.03em 0 ${darkness},0 .03em ${darkness},0 -.03em ${darkness},.06em 0 ${darkness},-.06em 0 ${darkness},.09em 0 ${darkness},-.09em 0 ${darkness},.12em 0 ${darkness},-.12em 0 ${darkness},.15em 0 ${darkness},-.15em 0 ${darkness}` // eslint-disable-line
    }
  })
});

export default typography;
export const rhythm = typography.rhythm;
