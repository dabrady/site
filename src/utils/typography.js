const BASE_FONT_SIZE = 16; // px
const BASE_LINE_HEIGHT = 1.5;

export const BASELINE = BASE_FONT_SIZE * BASE_LINE_HEIGHT;
// A 'golden ratio'
export const SCALE_RATIO = 1.618;

// Scale of font sizes and spaces (for margin and padding) based on a common ratio.
export const FONT_SIZES = _modularScale().map(f => `${f}em`);
export const SPACES = _spaces();
export const LINE_HEIGHTS = _lineHeights(_modularScale());

// *********

function _modularScale(count = 6) {
  return Array.from(Array(count).keys()).map(
    x => Math.round(Math.pow(SCALE_RATIO, x) * 1000) / 1000 // using multiply-&-divide for rounding to a precision
  );
}

function _spaces(count = 6) {
  // As our text size increases, so too must the breathing space around it.
  return Array.from(Array(count).keys()).map(x => `${x * SCALE_RATIO * 2}px`);
}

function _lineHeights(emScale) {
  var pointSizes = emScale.map(em => em * BASE_FONT_SIZE);
  return pointSizes.map(f => (Math.ceil(f / BASELINE) * BASELINE) / f);
}
