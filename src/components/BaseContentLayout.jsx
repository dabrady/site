/** @jsxImportSource theme-ui */

import { Global } from "@emotion/react";

import { Container } from "theme-ui";

import SiteHelmet from '@components/SiteHelmet';

export default function BaseContentLayout({ children }) {
  return (
    <>
      <SiteHelmet/>
      <Global styles={{
        body: {
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '1000px',
        }
      }}/>
      <Container
        sx={{
          maxHeight: 'none',
          width: "auto",
          maxWidth: ['100vw', '85vw', '60vw'],
          margin: ['1.5rem', '0 2.5rem 2.5rem 12rem'],
          paddingTop: [0, '3rem']
        }}
      >
        {children}
      </Container>
    </>
  );
}
