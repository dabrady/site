import { useEffect } from "react";

export const Modes = {
  DARK: 'dark',
  LIGHT: 'light',
};

/** React to users' system theme change. **/
export default function useSystemTheme(memoizedReaction) {
  useEffect(function syncThemeWithSystem() {
    function react(darkModeQuery) {
      if ( darkModeQuery.matches ) {
        memoizedReaction(Modes.DARK);
      } else {
        memoizedReaction(Modes.LIGHT);
      }
    }

    // React when browser detects system theme has changed.
    var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', react);

    // Stop monitoring system theme when component is unmounted.
    return function stopSwitchingModes() {
      darkModeMediaQuery.removeEventListener('change', react);
    };
  }, [memoizedReaction]);
}
