/** @jsxImportSource theme-ui */

import { useState } from 'react';
import { Container } from "theme-ui";

import CoreLayout from '@components/CoreLayout';
import Terminav from "@components/Terminav";

import { NavContext } from "@utils/hooks/useNavContext";

export default function BaseContentLayout({ children, showNavOnLoad = true }) {
  const [showTerminav, setShowTerminav] = useState(showNavOnLoad);
  return (
    <CoreLayout>
      <Container
        sx={{
          maxHeight: 'none',
          width: 'inherit',
          maxWidth: ['100vw', '85vw', '60vw'],
          margin: ['1.5rem', '0 2.5rem 2.5rem 12rem'],
          paddingTop: [0, '3rem'],
          paddingBottom: ['inherit', '18rem'],
        }}
      >
        <NavContext.Provider value={{
          showNav: setShowTerminav,
          isNavShown: showTerminav
        }}>
          {children}
        </NavContext.Provider>
        {showTerminav && <Terminav />}
      </Container>
    </CoreLayout>
  );
}
