/** @jsxImportSource theme-ui */

import { Container } from "theme-ui";

import SiteHelmet from '@components/SiteHelmet';

export default function FullscreenNoScrollLayout({ children }) {
  return (
    <>
      <SiteHelmet/>
      <Container
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          height: "auto",
          maxWidth: ["85vw"],
          margin: ["2rem auto", "2.8rem auto"],
        }}
      >
        {children}
      </Container>
    </>
  );
}
