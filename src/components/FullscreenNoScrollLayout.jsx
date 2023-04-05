/** @jsxImportSource theme-ui */

import { Global, Container } from "theme-ui";
import { useState } from 'react';

import CoreLayout from '@components/CoreLayout';
import Terminav from "@components/Terminav";
import { NavContext } from "@utils/hooks/useNavContext";

export default function FullscreenNoScrollLayout({ children, showNavOnLoad = true }) {
  const [showTerminav, setShowTerminav] = useState(showNavOnLoad);
  return (
    <CoreLayout>
      <Global styles={{
        // Reset some 'body' global overrides
        body: {
          marginLeft: 'inherit',
          marginRight: 'inherit',
          width: 'inherit',
          maxWidth: 'inherit',
          position: 'inherit',
        }
      }}/>
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
        {showTerminav && <Terminav />}
        <NavContext.Provider value={{
          showNav: setShowTerminav,
          isNavShown: showTerminav
        }}>
          {children}
        </NavContext.Provider>
      </Container>
    </CoreLayout>
  );
}
