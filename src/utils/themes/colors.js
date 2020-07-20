import gray from "gray-percentage";
import chroma from "chroma-js";

const colors = {
  Black: chroma("#000").css(),
  White: chroma("#fff").css(),
  Red: chroma("#933").css(),
  Charcoal: chroma("#282828").css(),
  SoftGray: chroma("#9b9b9b").css(),
  IcyBlue: chroma("#00b7ff").css(),
  SoftWhite: chroma(gray(90, 0, true)).css(),
  DirtySnow: chroma(gray(73, 0, true)).css()
};

export default colors;
