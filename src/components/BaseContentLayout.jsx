/** @jsxImportSource theme-ui */

import { useEffect, useRef, useState } from 'react';
import { Box, Container } from "theme-ui";

import CoreLayout from '@components/CoreLayout';
import Terminav from "@components/Terminav";

export default function BaseContentLayout({ children, className }) {
  return (
    <CoreLayout>
      <Container
        className={className}
        sx={{
          maxHeight: 'none',
          width: 'inherit',
          maxWidth: ['100vw', '85vw', '60vw'],
          margin: ['1.5rem', '0 2.5rem 2.5rem 12rem'],
          paddingTop: [0, '2rem'],
        }}
      >
        {/* Main Content */}
        <Box sx={{
          borderTop: '1px solid',
          paddingTop: [0, '1rem'],
        }}>
          {children}
        </Box>

        {/* Footer */}
        <Box sx={{ paddingTop: '2rem' }}>
          <Terminav />
        </Box>
      </Container>
    </CoreLayout>
  );
}
