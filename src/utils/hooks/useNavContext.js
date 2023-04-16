import { createContext, useContext } from 'react';

export const NavContext = createContext({
  showNav() {},
  isNavShown: false,
});

export default function useNavContext() {
  return useContext(NavContext);
}
