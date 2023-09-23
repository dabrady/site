/** A simple but effective way of detecting touch-based devices. **/
export default function isTouchDevice() {
  return ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
}
