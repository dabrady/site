/** @jsxImportSource theme-ui */

import { Link as InternalLink } from 'gatsby';
import { Box, Link as ThemeLink } from 'theme-ui';

export function Link({ href, ...props}) {
  if (href.startsWith('http')) {
    return <ThemeLink variant='links.external' href={href} {...props}/>;
  }
  return <InternalLink to={href} sx={{ variant: 'links.local', ...(props.sx || {}) }} {...props}/>;
}
