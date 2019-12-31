import styled from "@emotion/styled";
import { theme } from "../utils/typography";
import * as Colors from "../utils/themes/colors";

// TODO These references to the theme won't get updated if the
// theme changes without a restart! How to keep them in sync?
// Make them functions somehow?
const palette = {
  BG: theme.colors.background,
  BGT: Colors.transparent(theme.colors.background),
  b: Colors.default.black,
  bT: Colors.transparent(Colors.default.black),
  r: Colors.default.red
};

const fixedMeasurements = `
  /*** Main ring ***/
  radial-gradient(
    100% 100% at 50% 50%,
    ${palette.bT} 12.95em,
    ${palette.b} 13em,
    ${palette.b} 13.95em,
    ${palette.bT} 14em
  ) 0% 0% / 28em 28em,

  /*** Semicolon ***/
  /* top dot */
  radial-gradient(
    100% 100% at 50% 50%,
    ${palette.b} 49%,
    ${palette.bT} 50%
  ) 9em 8em / 3.2em 3.2em,

  /* bottom dot */
  radial-gradient(
    100% 100% at 50% 50%,
    ${palette.b} 49%,
    ${palette.bT} 50%
  ) 9em 12.5em / 3.7em 3.8em,

  /* swoop: connective curve of swoopy blackness */
  radial-gradient(
    200% 150% at -50% 70%,
    ${palette.bT} calc(50% - 0.05em),
    ${palette.b} 50%
  ) 10.4em 16em / 0.5em 1.6em,

  /* swoop: inside curve of swoopy blackness */
  radial-gradient(
    380% 170% at -90% 10%,
    ${palette.BG} calc(50% - 0.05em),
    ${palette.BGT} 50%
  ) 9.1em 14.4em / 1.8em 7em,

  /* swoop: outside curve of swoopy blackness */
  radial-gradient(
    300% 200% at -50% 5%,
    ${palette.b} calc(50% - 0.05em),
    ${palette.bT} 50%
  ) 9.1em 14.4em / 3.6em 6em,

  /*** Curly wing ***/
  radial-gradient(
    364% 280% at -100% 118%,
    ${palette.BG} calc(50% - 0.05em),
    /* ${Colors.default.icyblue} calc(50% - 0.05em), */
    ${palette.b} 50%
  ) 3.9em 7em / 3.2em 2.8em,
  radial-gradient(
    100% 150% at 30% 100%,
    ${palette.BG} 49%,
    ${palette.b} 50%
  ) 4em 7em / 3.2em 3.8em,
  radial-gradient(
    180% 180% at 114% 3%,
    ${palette.b} calc(50% - 0.05em),
    ${palette.BG} 50%
  ) 5.6em 10.4em / 3.8em 4.6em,
  radial-gradient(
    100% 120% at 100% 8%,
    ${palette.b} 49%,
    ${palette.BG} 50%
  ) 3em 6em / 1em 1.6em,
  radial-gradient(
    120% 100% at 30% 50%,
    ${palette.b} 49%,
    ${palette.bT} 50%
  ) 3.6em 5.5em / 4.4em 2em,
  radial-gradient(
    150% 150% at 0% 75%,
    ${palette.b} calc(50% - 0.05em),
    ${palette.bT} 50%
  ) 6.4em 5.8em / 4.2em 8em
`;

const size = 10;
export default styled.div`
  background: ${fixedMeasurements};

  background-repeat: no-repeat;
  font-size: ${size}px;
  outline: 1px solid #aaa;
  width: 28em;
  height: 28em;
  position: absolute;
  top: calc(50% - 14em);
  left: calc(50% - 14em);
`;
