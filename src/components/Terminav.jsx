/** @jsxImportSource theme-ui */
import { navigate } from 'gatsby';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Input, Label, NavLink, Paragraph } from 'theme-ui';

import NavLinks from '@content/navlinks.yaml';

const NAV_LINKS = _.transform(
  NavLinks,
  function makeNavLink(acc, { label, path }) {
    acc[label] = <NavLink variant='local' href={path}>{label}</NavLink>;
  },
  {}
);
const UNKNOWN_COMMAND = '_UNKNOWN_';
const COMMANDS = {
  ['ls']: function listAvailableNavLinks() {
    return <MonoList items={_.values(availableNavLinks())}/>;
  },
  ['help']: function listAvailableCommands() {
    return <MonoList items={_.without(_.keys(COMMANDS), UNKNOWN_COMMAND)}/>;
  },
  ['cd']: function navigateTo(link) {
    // Navigate to the link destination.
    if (link in NAV_LINKS) {
      navigate(NAV_LINKS[link].props.href);
      return null;
    }

    // Bonus feature: `cd -` acts as a back-button.
    if (link == '-') {
      navigate(-1);
      return null;
    }

    // If you don't provide a known link, we show you your options.
    return (
      <MonoList
        heading='Available links'
        items={_.values(availableNavLinks())}
      />
    );
  },
  [UNKNOWN_COMMAND]: function gentlyCorrect() {
    return (
      <MonoList
        heading='Did you mean one of these?'
        items={_.without(_.keys(COMMANDS), UNKNOWN_COMMAND)}
      />
    );
  },
};

/** A navigation component with the look and feel of a terminal. */
export default function Terminav({ scrollVisibilityThreshold = 85 }) {
  var inputRef = useRef();
  var [output, setOutput] = useState(COMMANDS.ls());
  var [opacity, setOpacity] = useState(0);

  /**
   * This effect makes the Terminav fade in based on user's scroll position.
   */
  useEffect(function() {
    function adjustOpacity(ev) {
      var focused = inputRef?.current && document.activeElement == inputRef.current;
      if (focused) return;

      var root = document.documentElement;
      var navPosition = inputRef.current.getBoundingClientRect();
      var navInView = navPosition.bottom <= root.clientHeight;

      var maxScrollPosition = root.scrollHeight - root.clientHeight;
      var currentScrollPosition = root.scrollTop;
      var scrollProgress = (currentScrollPosition / maxScrollPosition) * 100;

      if (
        maxScrollPosition == 0
          || isNaN(scrollProgress)
          || (navInView && scrollProgress >= scrollVisibilityThreshold)
      ) {
        setOpacity(1);
        // Focus on visible when not on touch devices.
        // Input focus on touch devices tends to automatically open a keyboard,
        // and that's annoying.
        if (ev.type == 'wheel' && navInView) {
          inputRef.current.focus();
        }
      } else {
        setOpacity(0);
      }
    }

    // NOTE(dabrady) Using 'wheel' event instead of 'scroll' here because it
    // fires when a user _attempts_ to scroll, even if the page is not scrollable.
    // The 'scroll' event only fires when the page actually scrolls.
    window.addEventListener('wheel', adjustOpacity);
    window.addEventListener('touchmove', adjustOpacity);
    return function stopListening() {
      window.removeEventListener('wheel', adjustOpacity);
      window.removeEventListener('touchmove', adjustOpacity);
    };
  }, []);

  return (
    <Box sx={{
      // NOTE(dabrady) Currently, the content of this navbar will be at most 3
      // lines of body text, so using that plus a bit extra to give breathing room.
      height: ({ lineHeights }) => `calc(${lineHeights.body} * 4rem)`,
      marginBottom: '0.6rem',
      visibility: opacity ? 'visible' : 'hidden',
      opacity,
      transition: 'visibility 0.3s linear, opacity 0.3s linear',
    }}>
      <Flex
        as='form'
        spellCheck={false}
        autoComplete='off'
        onSubmit={function processInput(e) {
          e.preventDefault();

          var input = inputRef.current.value;
          var [commandName, ...args] = input.split(' ');
          var command = _.get(COMMANDS, commandName, COMMANDS['_UNKNOWN_']);
          setOutput(() => command(...args));
          inputRef.current.value = '';
        }}
      >
        <Label
          htmlFor='terminav-input'
          sx={{
            flex: 1,
            fontFamily: 'monospace'
          }}
        >➜</Label>
        <Input
          id='terminav-input'
          name='terminav-input'
          ref={inputRef}
          placeholder='explore...'
          sx={{ fontFamily: 'monospace' }}
        />
      </Flex>
      <Box>{output}</Box>
    </Box>
  );
}

/**** Helpers ****/

/** A monospaced, inline, undecorated list. */
function MonoList({ heading, items }) {
  return (
    <>
      {heading && (
        <p sx={{
          variant: 'text.monospace',
          margin: '0',
          padding: '0',
        }}>
          {heading}
        </p>)}
      <ul sx={{ padding: 0, margin: 0 }}>
        {_.map(items, function renderItem(item, key) {
          return (
            <li
              key={key}
              sx={{
                variant: 'text.monospace',
                display: 'inline',
                margin: '0',
                padding: '0',
                paddingRight: 7,
                "&::before": {
                  content: '""',
                },
              }}
            >{item}</li>
          );
        })}
      </ul>
    </>
  );
}

/** Filters out the current page from the set of possible nav links. */
function availableNavLinks() {
  var currentPage = typeof window != 'undefined' ? window.location.pathname : '';
  var currentPageLink = _.findKey(NAV_LINKS, ['props.href', currentPage]);
  return _.omit(NAV_LINKS, currentPageLink);
}
