import FontFaceObserver from "fontfaceobserver";
import { updateTypography } from "@utils/typography";

const font = new FontFaceObserver("Lato");
font
  .load()
  .then(function fontLoaded() {
    updateTypography({
      bodyFontFamily: ["Lato"],
      headerFontFamily: ["Lato"]
    });
  })
  .catch(function fontLoadFailed(e) {
    console.error("lato font failed to load", e);
  });
