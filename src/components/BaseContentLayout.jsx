/** @jsxImportSource theme-ui */

import { Container } from "theme-ui";

import CoreLayout from '@components/CoreLayout';

export default function BaseContentLayout({ children }) {
  return (
    <CoreLayout>
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
    </CoreLayout>
  );
}
