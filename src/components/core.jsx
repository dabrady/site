/** @jsxImportSource theme-ui */

import { Link as InternalLink } from 'gatsby';
import { Box, Heading, Link as ThemeLink } from 'theme-ui';

export function Link({ href, ...props}) {
  if (href.startsWith('http')) {
    return <ThemeLink variant='links.external' href={href} {...props}/>;
  }
  return <InternalLink to={href} sx={{ variant: 'links.local', ...(props.sx || {}) }} {...props}/>;
}

export function Stars() {
  return (
    <Heading as='h2' align='center'>
      *&nbsp;&nbsp;*&nbsp;&nbsp;*
    </Heading>
  );
}

export function Nomad() {
  return (
    <iframe
      sx={{
        width: '100%',
        height: '33vh',
        paddingBottom: '1rem',
      }}
      src='https://nomadlist.com/@daniel13rady/embed'
      scrolling='no'
      frameBorder='0'
      allowFullScreen
    />
  );
}

export function Series({ children, top = false }) {
  return (
    <div sx={top ? { paddingBottom: '2rem' } : undefined}>
      {!top && (
        <span align="center">
          <p><em>This is part of a longer reflection.</em></p>
        </span>
      )}

      <ul sx={{
        padding: 0,
        margin: 0,
        display: 'flex',
        gap: '1rem',
        justifyContent: 'space-between',
      }}>
        {children}
      </ul>
    </div>
  );
}
Series.Intro = function Intro({ children }) {
  return (
    <div sx={{
      paddingTop: [0, '1.4rem'],
      'p': {
        fontStyle: 'italic',
      }
    }}>{children}</div>
  );
};
Series.Previous = function Previous({ children }) {
  return (
    <li
      sx={{
        margin: '0',
        padding: '0',
        "&::before": {
          content: '""',
        },
        "& a::before": {
          content: '"←"',
          paddingRight: '0.8rem',
        },
      }}
    >{children}</li>
  );
};
Series.Next = function Next({ children, todo = false}) {
  return (
    <span title={todo ? 'To be continued…' : undefined}>
      <li
        sx={{
          margin: '0',
          marginLeft: 'auto',
          padding: '0',
          textAlign: 'right',
          "&::before": {
            content: '""',
          },
          pointerEvents: todo ? 'none' : 'inherit',
          "& a": {
            color: (theme) => todo ? theme.colors.hardGray : 'inherit',
          },
          "& a::after": {
            content: '"→"',
            paddingLeft: '0.8rem',
          },
        }}
      >{children}</li>
    </span>
  );
};
