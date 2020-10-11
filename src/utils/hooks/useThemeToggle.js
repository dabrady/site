import { useColorMode } from "theme-ui";

export default function useThemeToggle() {
  var [colorMode, setColorMode] = useColorMode();
  function otherMode() {
    return (colorMode == "default" && "dark") || "default";
  }

  return function toggleTheme() {
    setColorMode(otherMode());
  };
}
