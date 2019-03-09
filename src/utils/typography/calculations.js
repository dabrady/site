// Scale of font sizes and spaces (for margin and padding) based on a common ratio.
export const fontSizes = ratio =>
  Array.from(Array(9).keys()).map(
    x => `${Math.round(Math.pow(ratio, x) * 1000) / 1000}em` // using multiply-&-divide for rounding to a precision
  );
export const spaces = ratio =>
  Array.from(Array(9).keys()).map(x => `${x * ratio * 2}px`);
