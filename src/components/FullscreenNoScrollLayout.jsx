/** @jsxImportSource theme-ui */

import { Global, Container } from "theme-ui";
import { useState } from 'react';

import CoreLayout from '@components/CoreLayout';

export default function FullscreenNoScrollLayout({ children, className }) {
  return (
    <CoreLayout>
      <Global styles={{
        // Reset some 'body' global overrides
        // TODO(dabrady) Don't do this, just redesign the home page layout.
        body: {
          marginLeft: 'inherit',
          marginRight: 'inherit',
          width: 'inherit',
          maxWidth: 'inherit',
          position: 'inherit',
        }
      }}/>
      <Container
        className={className}
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
    </CoreLayout>
  );
}
