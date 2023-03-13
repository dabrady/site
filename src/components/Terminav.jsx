/** @jsxImportSource theme-ui */
import { navigate } from 'gatsby';
import _ from 'lodash';
import { useRef, useState } from 'react';
import { Box, Flex, Input, Label, NavLink, Paragraph } from 'theme-ui';

const NAV_LINKS = {
  ['home']: <NavLink variant='local' href='/'>home</NavLink>,
  ['blog']: <NavLink variant='local' href='/blog'>blog</NavLink>,
  ['wishlist']: <NavLink variant='local' href='/wishlist'>wishlist</NavLink>
}
const UNKNOWN_COMMAND = '_UNKNOWN_';
const COMMANDS = {
  ['ls']: () => <MonoList items={_.values(availableNavLinks())}/>,
  ['help']: () => <MonoList items={_.without(_.keys(COMMANDS), UNKNOWN_COMMAND)}/>,
  ['cd']: (link) => {
    if (link in NAV_LINKS) {
      navigate(NAV_LINKS[link].props.href);
      return null;
    }

    if (link == '-') {
      navigate(-1);
      return null;
    }

    return (
      <MonoList items={_.values(availableNavLinks())}>
        Available links:
      </MonoList>
    );
  },
  [UNKNOWN_COMMAND]: () => (
    <MonoList items={_.without(_.keys(COMMANDS), UNKNOWN_COMMAND)}>
      Did you mean one of these?
    </MonoList>
  ),
};

export default function Terminav(props) {
  var inputRef = useRef();
  var [output, setOutput] = useState(null);

  return (
    <Box sx={{ height: '100px' }}>
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
        <Label htmlFor='terminav-input' sx={{
          padding: "11px 15px 11px 0",
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
          variant='text.input'
          sx={{
            fontFamily: 'monospace'
          }}
        />
      </Flex>
      <Box>{output}</Box>
    </Box>
  );
}

/**** Helpers ****/

function Mono({children, sx, ...rest}) {
  return (
    <Box
      variant='text.monospace'
      sx={_.merge({
        marginLeft: [1],
      }, sx)}
      {...rest}
    >
      {children}
    </Box>
  );
}

function MonoList({ items, children }) {
  return (
    <Mono>
      {children}
      <ul sx={{ padding: 0, margin: 0, }}>
        {_.map(items, function renderItem(item, key) {
          return (
            <li
              key={key}
              sx={{
                display: 'inline',
                paddingRight: 7
              }}
            >{item}</li>
          );
        })}
      </ul>
    </Mono>
  );
}

function availableNavLinks() {
  var currentPage = typeof window != 'undefined' ? window.location.pathname : '';
  var currentPageLink = _.findKey(NAV_LINKS, ['props.href', currentPage]);
  return _.omit(NAV_LINKS, currentPageLink);
}
