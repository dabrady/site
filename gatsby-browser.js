// import FontFaceObserver from "fontfaceobserver";

// const font = new FontFaceObserver("Lato");
// font
//   .load()
//   .then(function fontLoaded() {
//     // TODO Find a way to recreate this using Theme UI
//     // updateTypography({
//     //   bodyFontFamily: ["Lato"],
//     //   headerFontFamily: ["Lato"]
//     // });
//   })
//   .catch(function fontLoadFailed(e) {
//     console.error("lato font failed to load", e);
//   });

// @see https://github.com/system-ui/theme-ui/blob/f6380fc356ce97e64bf50ba60e0bc6f38a25dabe/packages/color-modes/src/index.js#L7
const STORAGE_KEY = "theme-ui-color-mode";
function setColorMode(mode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch (e) {
    console.warn(
      "localStorage is disabled and color mode might not work as expected.",
      "Please check your Site Settings.",
      e
    );
  }
}
// TODO Figure out how to respond to this change within the running app.
// exports.onClientEntry = function watchSystemTheme() {
//   window
//     .matchMedia("(prefers-color-scheme: dark)")
//     .addListener(function toggleMode(e) {
//       console.log(`changed to ${e.matches ? "dark" : "light"} mode`);
//       if (e.matches) {
//         setColorMode("dark");
//       } else {
//         setColorMode("default");
//       }
//     });
// };
