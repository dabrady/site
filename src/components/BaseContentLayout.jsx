/** @jsxImportSource theme-ui */

import { useEffect, useRef, useState } from 'react';
import { Box, Container } from "theme-ui";

import CoreLayout from '@components/CoreLayout';
import Terminav from "@components/Terminav";

export default function BaseContentLayout({ children, className }) {
  return (
    <CoreLayout>
      <Box sx={{ position: 'relative' }}>
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
            paddingTop: [0, '0.8rem'],

            '& > h1:nth-of-type(1)': {
              color: 'accent',
              paddingTop: '0.4rem',
              marginBottom: '2rem',
            },
          }}>
            {children}
          </Box>
        </Container>
      </Box>
    </CoreLayout>
  );
}
