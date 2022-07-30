import { useEffect } from "react";
import { useThemeUI } from "theme-ui";

/** Sync site theme with users' system. **/
export default function useSystemTheme() {
  var { setColorMode } = useThemeUI();
  useEffect(function syncThemeWithSystem() {
    function switchMode(darkMode) {
      if ( darkMode.matches ) {
        setColorMode('night');
      } else {
        setColorMode('day');
      }
    }

    // Switch mode when browser detects system theme has changed.
    var darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    darkModeMediaQuery.addEventListener('change', switchMode);

    // Stop monitoring system theme when component is unmounted.
    return function stopSwitchingModes() {
      darkModeMediaQuery.removeEventListener('change', switchMode);
    };
  }, [setColorMode]);
}
