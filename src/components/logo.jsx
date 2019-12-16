import styled from "@emotion/styled";
import { theme } from "../utils/typography";
import * as Colors from "../utils/themes/colors";

// TODO These references to the theme won't get updated if the
// theme changes without a restart! How to keep them in sync?
// Make them functions somehow?
const palette = {
  BG: theme.colors.background,
  BGT: Colors.transparent(theme.colors.background),
  w: "rgba(255,255,255,1)",
  wT: "rgba(255,255,255,0)",
  b: "rgba(0,0,0,1)",
  bT: "rgba(0,0,0,0)",
  r: "rgba(255,0,0,1)"
};

const fixedMeasurements = `
  /* outer ring */
  radial-gradient(
    100% 100% at 50% 50%,
    ${palette.bT} 12.95em,
    ${palette.b} 13em,
    ${palette.b} 13.95em,
    ${palette.bT} 14em
  ) 0% 0% / 28em 28em,

  /* semicolon top dot */
  radial-gradient(
    100% 100% at 50% 50%,
    ${palette.b} 49%,
    ${palette.bT} 50%
  ) 9em 8em / 3em 3em,

  /* semicolon bottom dot */
  radial-gradient(
    100% 100% at 50% 50%,
    ${palette.b} 49%,
    ${palette.bT} 50%
  ) 9em 12.5em / 3.7em 3.8em,

  /* semicolon swoop: connective curve of swoopy blackness */
  radial-gradient(
    200% 150% at -50% 70%,
    ${palette.bT} calc(50% - 0.05em),
    ${palette.b} 50%
  ) 10.4em 16em / 0.5em 1.6em,

  /* semicolon swoop: inside curve of swoopy blackness */
  radial-gradient(
    380% 170% at -90% 10%,
    ${palette.BG} calc(50% - 0.05em),
    ${palette.BGT} 50%
  ) 9.1em 14.4em / 1.8em 7em,

  /* semicolon swoop: outside curve of swoopy blackness */
  radial-gradient(
    300% 200% at -50% 5%,
    ${palette.b} calc(50% - 0.05em),
    ${palette.BGT} 50%
  ) 9.1em 14.4em / 3.6em 6em
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
