import { useColorMode } from "theme-ui";

export default function useThemeToggle() {
  var [colorMode, setColorMode] = useColorMode();
  function otherMode() {
    return (["day", "light"].includes(colorMode) && "night") || "day";
  }

  return function toggleTheme() {
    setColorMode(otherMode());
  };
}
