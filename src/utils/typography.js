export const BASE_FONT_SIZE = 16; // px
export const BASE_LINE_HEIGHT = 1.5;
export const BASELINE = BASE_FONT_SIZE * BASE_LINE_HEIGHT;
export const Scales = {
  GOLDEN: 1.618,
  PERFECT_FIFTH: 1.500,
  AUGMENTED_FOURTH: 1.414,
  PERFECT_FOURTH: 1.333,
  MAJOR_THIRD: 1.250,
  MINOR_THIRD: 1.200,
  MAJOR_SECOND: 1.125,
  MINOR_SECOND: 1.067
}
export const SCALE_RATIO = Scales.AUGMENTED_FOURTH; // Looks nice with site background.

// Scale of font sizes and spaces (for margin and padding) based on a common ratio.
export const FONT_SIZES = _modularScale().map(f => `${f}em`);
export const SPACES = _spaces();
export const LINE_HEIGHTS = _lineHeights(_modularScale());

// *********

function _modularScale(count = 9) {
  return Array.from(Array(count).keys()).map(
    x => Math.round(Math.pow(SCALE_RATIO, x) * 1000) / 1000 // using multiply-&-divide for rounding to a precision
  );
}

function _spaces(count = 9) {
  // As our text size increases, so too must the breathing space around it.
  return Array.from(Array(count).keys()).map(x => `${x * SCALE_RATIO * 2}px`);
}

function _lineHeights(emScale) {
  var pointSizes = emScale.map(em => em * BASE_FONT_SIZE);
  return pointSizes.map(f => (Math.ceil(f / BASELINE) * BASELINE) / f);
}
