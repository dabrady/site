/** @jsxImportSource theme-ui */
import { navigate } from 'gatsby';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Box, Container, Flex, Input, Label, NavLink, Paragraph } from 'theme-ui';

import NavLinks from '@content/navlinks.yaml';

import theme from '@styles/theme';

import isTouchDevice from '@utils/isTouchDevice';
import useEdgeScrollListener from '@utils/hooks/useEdgeScrollListener.hook';

const NAV_LINKS = _.transform(
  NavLinks,
  function makeNavLink(acc, { label, path }) {
    acc[label] = (
      <NavLink
        variant='local'
        href={path}
        sx={{ fontFamily: 'monospace', fontWeight: 'normal' }}
      >
        {label}
      </NavLink>
    );
  },
  {}
);
const UNKNOWN_COMMAND = '_UNKNOWN_';
const COMMANDS = {
  ['ls']: function listAvailableNavLinks() {
    return <TreeList items={_.values(availableNavLinks())}/>;
  },
  ['help']: function listAvailableCommands() {
    return <MonoList items={_.without(_.keys(COMMANDS), UNKNOWN_COMMAND)}/>;
  },
  ['cd']: function navigateTo(link, close) {
    // Just reset if they try to navigate to the current page.
    if (link == currentPageLink()) {
      // Close the terminav.
      close();
      // Prep the display text for the next time they open it.
      return COMMANDS['ls']();
    }

    // Navigate to the link destination.
    if (link in NAV_LINKS) {
      navigate(NAV_LINKS[link].props.href);
      return close();
    }

    // Bonus feature: `cd -` acts as a back-button.
    if (link == '-') {
      navigate(-1);
      return close();
    }

    // If you don't provide a known link, we show you your options.
    return (
      <TreeList
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
  // NOTE(dabrady) Certain interactivity is not suited to touch interfaces.
  var interactive = !isTouchDevice();

  var inputRef = useRef();
  var [output, setOutput] = useState(COMMANDS.ls());

  var [opacity, _setOpacity] = useState(0);
  function show() {
    _setOpacity(1);
    // Prevent body from scrolling underneath.
    document.body.setAttribute('style', 'overflow: hidden');
  }
  function hide() {
    _setOpacity(0);
    // Reactivate scrolling on body.
    document.body.removeAttribute('style');
  }

  /**
   * This effect makes the Terminav fade in when you scroll past the edge of the screen.
   */
  useEdgeScrollListener({
    handler: function showTerminav() {
      show();
      // Focus once visible.
      setTimeout(function focusTerminav() {
        inputRef.current?.focus();
      }, 250);
    },
    pauseWhen: function terminavIsVisible() {
      return opacity == 1;
    },
    deps: [opacity],
  });

  return (
    /* Fullscreen overlay */
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        backdropFilter: 'blur(20px)',
        zIndex: 9001,
        visibility: opacity ? 'visible' : 'hidden',
        opacity,
        transition: 'visibility 0.3s linear, opacity 0.3s linear',
      }}
      onClick={hide}
    >
      {/* Overlay body (for relative positioning of contents) */}
      <Container
        sx={{
          maxHeight: 'none',
          width: 'inherit',
          maxWidth: '1000px',
        }}
      >
        {/* Overlay contents */}
        <Box sx={{
          margin: ['5.5rem 3.5rem', '4.8rem 2.5rem 2.5rem 12rem'],
        }}>
          <Box sx={{
            // NOTE(dabrady) Currently, the content of this navbar will be at most 3
            // lines of body text, so using that plus a bit extra to give breathing room.
            height: ({ lineHeights }) => `calc(${lineHeights.body} * 4rem)`,
            marginBottom: '0.6rem',
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
                setOutput(() => command(...args, hide));
                inputRef.current.value = '';
              }}
            >
              <Label
                htmlFor='terminav-input'
                sx={{
                  flex: 1,
                  fontFamily: 'monospace',
                  margin: 0,
                  padding: 0,
                  display: 'inline',
                  width: 'fit-content'
                }}
              >{interactive
                ? '➜'
                : <span
                    sx={{
                      color: 'accent',
                      fontFamily: 'monospace',
                    }}
                  >
                    ./
                  </span>
                }</Label>
              {interactive &&
               <Input
                 id='terminav-input'
                 name='terminav-input'
                 ref={inputRef}
                 placeholder='explore...'
                 sx={{ fontFamily: 'monospace', color: 'accent' }}
               />}
            </Flex>
            <Box>{output}</Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/**** Helpers ****/

/** A tree-formatted list. */
function TreeList({ heading, items }) {
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
            <li key={key} sx={theme.treelistItem}>{item}</li>
          );
        })}
      </ul>
    </>
  );
}

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
                paddingRight: '1.4rem',
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

/** Finds the nav link to the current page. */
function currentPageLink() {
  var currentPage = typeof window != 'undefined' ? window.location.pathname : '';
  return _.findKey(NAV_LINKS, ['props.href', currentPage]);
}

/** Filters out the current page from the set of possible nav links. */
function availableNavLinks() {
  return _.omit(NAV_LINKS, currentPageLink());
}
