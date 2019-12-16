import gray from "gray-percentage";

const colors = {
  black: "rgba(0,0,0,1)",
  white: "rgba(255,255,255,1)",
  charcoal: "#282828",
  icyblue: "#80aac6",
  softwhite: gray(90, 0, true),
  dirtysnow: gray(73, 0, true)
};

/**
 * Parses a CSS color into an array of JS values.
 * The first value is the CSS color function string, and the rest are
 * the number representations of the color values.
 *
 * TODO Support color keywords.
 */
export function parse(cssColor) {
  const COLOR_FUNC_REGEX = /^rgba|rgb|hsla|#/;
  const NON_HEX_COLOR_REGEX = /[^\d,.%]/g;
  const HEX_COLOR_REGEX = /#/g;

  var colorFunc = cssColor.match(COLOR_FUNC_REGEX)[0];
  return [
    colorFunc,
    ...cssColor
      .replace(colorFunc === "#" ? HEX_COLOR_REGEX : NON_HEX_COLOR_REGEX, "")
      .split(",")
  ];
}

/**
 * Generates a RGBA version of the given CSS color, with the A set to 0
 * thus creating a transparent version of the given color.
 *
 * Returns the appropriate CSS color string.
 */
export function transparent(cssColor) {
  // Thank you, community: https://stackoverflow.com/a/5624139/1795402
  function hexToRGB(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  var [func, ...values] = parse(cssColor);
  switch (func) {
    case "#":
      var rgb = hexToRGB(cssColor);
      if (!rgb) {
        console.warn(`Unrecognized hex color format: ${cssColor}`);
        return null;
      }
      var { r, g, b } = rgb;
      values = [r, g, b];
    case "rgb":
      return `rgba(${values}, 0)`;
    case "rgba":
    case "hsla":
      values[values.length - 1] = 0;
      return `${func}(${values})`;
    default:
      console.warn(`Unrecognized CSS color format: ${cssColor}`);
      return null;
  }
}

export default colors;
