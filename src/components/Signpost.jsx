/** @jsxImportSource theme-ui */
import { Box } from "theme-ui";

import ThemedSvg from "@components/ThemedSvg";
import { ReactComponent as Anchor } from "@images/anchor.svg";
import { ReactComponent as Link } from "@images/link.svg";
import { ReactComponent as SignLantern } from "@images/sign-and-lantern.svg";

export default function Signpost({}) {
  var origin = "calc(100vw - {0} - (2088 / 3) * 1px)";
  return (
    <Box sx={{
      /* position: 'absolute', */
      /* top: 0, */
      /* left: 0, */
      width: "100vw",
      /* height: "100vh" */
    }}>
      <ThemedSvg
        // Original:
        /* width="492px" height="1228px" */
        width="" height={1228 / 3}
        customStyle={{
          position: 'absolute',
          top: 15,
          left: 0,
        }}
      >
        <Anchor/>
      </ThemedSvg>
      <ThemedSvg
        // Original:
        /* width="" height="234px" */
        width="" height="234px"
        customStyle={{
          position: 'absolute',
          display: 'none', // TODO
          top: 222,
          left: 490
        }}
      >
        <Link/>
      </ThemedSvg>
      <ThemedSvg
        // Original:
        /* width="2088px" height="1371px" */
        width="" height={1371 / 3}
        customStyle={{
          position: 'absolute',
          top: 0,
          /* left: 537 */
          // left: "calc(100vw - (2088 / 3 ) * 1px)",
          /* left: 487 */
          /* left: 195 */
          left: ["1rem", "1.2rem", "2.86rem", "4.93rem"].map(m => origin.replace(/{(\d+)}/, m))
          // marginRight: 
        }}
      >
        <SignLantern/>
      </ThemedSvg>
    </Box>
  );
}
