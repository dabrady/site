import { Global } from "theme-ui";

import theme from '@styles/theme';

export default function SiteHelmet() {
  return (
    <>
      <Global styles={theme.globals}/>
    </>
  );
}
