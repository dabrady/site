/** @jsxImportSource theme-ui */

import { Container } from "theme-ui";

import SiteHelmet from '@components/SiteHelmet';

export default function BaseContentLayout({ children }) {
  return (
    <Container
      sx={{
        maxHeight: 'none',
      }}
    >
      <SiteHelmet/>
      {children}
    </Container>
  );
}
