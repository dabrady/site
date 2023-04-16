/** @jsxImportSource theme-ui */
import { navigate } from 'gatsby';
import _ from 'lodash';
import { useRef, useState } from 'react';
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
export default function Terminav(props) {
  var inputRef = useRef();
  var [output, setOutput] = useState(null);

  return (
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
        >$</Label>
        <Input
          id='terminav-input'
          name='terminav-input'
          ref={inputRef}
          autoFocus
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
                paddingRight: 7
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
