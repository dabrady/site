import { useColorMode } from "theme-ui";

export default function useThemeToggle() {
  var [colorMode, setColorMode] = useColorMode();
  function otherMode() {
    return (colorMode == "day" && "night") || "day";
  }

  return function toggleTheme() {
    setColorMode(otherMode());
  };
}
