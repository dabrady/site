import styled from "@emotion/styled";

const colors = {
  w: "rgba(255,255,255,0)",
  wT: "rgba(255,255,255,255)",
  b: "rgba(0,0,0,0)",
  bT: "rgba(0,0,0,255)",
  r: "rgba(255,0,0,255)"
};
export default styled.div`
  background:
  /* outer ring */ radial-gradient(
  100% 100% at 50% 50%,
  ${colors.b} 12.95em,
  ${colors.bT} 13em,
  ${colors.bT} 13.95em,
  ${colors.b} 14em
  ),

  /* semicolon top dot */
  radial-gradient(100% 100% at 50% 50%, ${colors.bT} 49%, ${colors.b} 50%)
  9em 8em / 3em 3em,

  /* semicolon bottom dot */
  radial-gradient(100% 100% at 50% 50%, ${colors.bT} 49%, ${colors.b} 50%)
  9em 12.5em / 3em 3em,

  /* semicolon swoop: top occluding white circle */
  radial-gradient(100% 100% at 50% 50%, ${colors.wT} 49%, ${colors.w} 50%)
  3em 10em / 9em 6em,

  /* semicolon swoop: middle occluding white circle */
  linear-gradient(${colors.w} 49%, ${colors.wT} 50%)
  2.25em 8em / 7em 12.25em,

  /* semicolon swoop: small swoopy white circle */
  radial-gradient(100% 100% at 50% 50%, ${colors.wT} 49%, ${colors.w} 50%)
  5.5em 14em / 5em 5.75em,

  /* semicolon swoop: swoopy blackness */
  radial-gradient(
  100% 100% at 50% 50%, ${colors.bT} 4.45em, ${colors.b} 4.5em
  ) 3.2em 10.2em / 9em 10em;

  /***/

  /* semicolon swoop: bigger occluding white circle */
  /* radial-gradient(100% 100% at 50% 50%, ${colors.wT} 49%, ${colors.w} 50%) */
  /* 3em 11em / 8em 8em, */

  background-repeat: no-repeat;
  font-size: 10px;
  outline: 1px solid #aaa;
  width: 28em;
  height: 28em;
  position: absolute;
  top: 50%;
  left: 50%;
`;
