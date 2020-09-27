import { get as getFrom } from "theme-ui";

// An unexposed Theme UI helper for extracting the raw color value from
// a Theme UI CSS variable.
// @see https://github.com/system-ui/theme-ui/blob/f6380fc356ce97e64bf50ba60e0bc6f38a25dabe/packages/color/src/index.js#L4
export function getColorFromTheme(theme, color) {
  return getFrom(theme, `colors.${color}`, color)
    .replace(/^var\(--(\w+)(.*?), /, "")
    .replace(/\)/, "");
}
