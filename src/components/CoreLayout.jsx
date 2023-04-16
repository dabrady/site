/** @jsxImportSource theme-ui */

import SiteHelmet from '@components/SiteHelmet';

export default function CoreLayout({ children }) {
  return (
    <>
      <SiteHelmet/>
      {children}
    </>
  );
}
