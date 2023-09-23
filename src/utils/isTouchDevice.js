/** A simple but effective way of detecting touch-based devices. **/
export default function isTouchDevice() {
  return (typeof window != 'undefined' && 'ontouchstart' in window)
    || (typeof navigator != 'undefined' && navigator.maxTouchPoints > 0);
}
