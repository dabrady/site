/** @jsxImportSource theme-ui */

import { Container } from "theme-ui";

import SiteHelmet from '@components/SiteHelmet';

export default function FullscreenNoScrollLayout({ children }) {
  return (
    <Container
      sx={{
        position: "absolute",
        height: "auto",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        maxHeight: 'none',
      }}
    >
      <SiteHelmet/>
      {children}
    </Container>
  );
}
