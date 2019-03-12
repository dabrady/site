import { useEffect } from "react";

export default function useEventListener(eventName, callback) {
  // Support listeners for multiple events
  useEffect(
    () => {
      document.addEventListener(eventName, callback);
      return () => document.removeEventListener(eventName, callback);
    },
    [eventName]
  );
}
