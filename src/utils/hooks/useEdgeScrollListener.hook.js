import { useEffect, useState } from 'react';

export default function useEdgeScrollListener(opts = {}) {
  var {
    handler,
    pauseWhen,
    deps,
  } = {
    handler: function noop() {},
    pauseWhen: function noop() {},
    deps: [],
    ...opts,
  };

  /* For mouse-based devices */
  useEffect(function () {
    if (pauseWhen()) return cleanup;

    // NOTE(dabrady) Using 'wheel' event instead of 'scroll' here because it
    // fires when a user _attempts_ to scroll, even if the page is not scrollable.
    // The 'scroll' event only fires when the page actually scrolls.
    window.addEventListener('wheel', triggerHandlerAtEdge);

    return cleanup;

    /********/

    function cleanup() {
      window.removeEventListener('wheel', triggerHandlerAtEdge);
    }

    var wheeling = false;
    var wheelingTimer;

    function triggerHandlerAtEdge(ev) {
      var root = document.documentElement;
      var maxScrollPosition = document.documentElement.scrollHeight - root.clientHeight;

      // Only pay attention to the FIRST 'wheel' event, i.e. the 'wheelstart'.
      if (!wheeling) {
        var wheeledUp = ev.deltaY < 0;
        var wheeledDown = ev.deltaY > 0;
        var atTopEdge = root.scrollTop <= 0;
        var atBottomEdge = root.scrollTop >= maxScrollPosition;

        // If the user attempts to scroll passed the edge of the page, trigger the handler.
        if (wheeledUp && atTopEdge) {
          handler();
        } else if(wheeledDown && atBottomEdge) {
          handler();
        }
      }

      // Track the wheeling. (There're no native 'wheelstart' or 'wheelstop' events.)
      wheeling = true;
      clearTimeout(wheelingTimer);
      wheelingTimer = setTimeout(function recordWheelingStop() {
        wheeling = false;
      }, 250); // Consider wheel to have stopped if enough time passes between events.
    }
  }, deps);

  /* For touch-based devices */
  useEffect(function () {
    if (pauseWhen()) return cleanup;

    window.addEventListener('touchstart', recordTouchStarts);
    window.addEventListener('touchmove', triggerHandlerAtEdge);

    return cleanup;

    /********/

    var touchStart = 0;

    function recordTouchStarts(ev) {
      touchStart = ev.changedTouches[0].screenY;
    }

    function triggerHandlerAtEdge(ev) {
      /**
       * Show the nav bar when the user attempts to scroll past the top or bottom of the
       * current page.
       *
       * NOTE(dabrady) After much experimentation and research, I found that on my iPhone,
       * the `window.innerHeight` property updates in response to the mobile browser hiding
       * or showing the toolbar, and `document.documentElement.clientHeight` assumes the
       * toolbar is hidden.
       **/
      var maxScrollPosition = document.documentElement.scrollHeight - window.innerHeight;
      var touchEnd = ev.changedTouches[0].screenY;

      var swipedUp = touchEnd >= touchStart;
      var swipedDown = touchEnd < touchStart;
      var atTopEdge = window.scrollY <= 0;
      var atBottomEdge = window.scrollY >= maxScrollPosition;
      if (swipedUp && atTopEdge) {
        handler();
      } else if (swipedDown && atBottomEdge) {
        handler();
      }
    }

    function cleanup() {
      window.removeEventListener('touchmove', triggerHandlerAtEdge);
      window.removeEventListener('touchstart', recordTouchStarts);
    }
  }, deps);
}
