/** @jsxImportSource theme-ui */

import SiteHelmet from '@components/SiteHelmet';
import Terminav from "@components/Terminav";

export default function CoreLayout({ children }) {
  return (
    <>
      <SiteHelmet/>
      {/* <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} /> */}
      {/* Show the Terminav when a user _tries_ to scroll */}
      <Terminav scrollVisibilityThreshold={0}/>
      {children}
    </>
  );
}
