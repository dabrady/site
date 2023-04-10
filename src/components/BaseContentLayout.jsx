/** @jsxImportSource theme-ui */

import { Global } from "@emotion/react";

import { Container } from "theme-ui";

import SiteHelmet from '@components/SiteHelmet';

export default function BaseContentLayout({ children }) {
  return (
    <>
      <SiteHelmet/>
      <Global styles={{
        '*': {
          padding: 0,
          margin: 0,
        },
        body: {
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          maxWidth: '1000px',
          position: 'relative',
        },
      }}/>
      <Container
        sx={{
          maxHeight: 'none',
          width: 'inherit',
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
