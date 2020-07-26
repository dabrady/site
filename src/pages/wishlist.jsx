import React from "react";
/** @jsx jsx */
import { Box, Donut, Grid, Heading, jsx } from "theme-ui";

import MainLayout from "@components/MainLayout";

function Doughnut({ value, progress, children }) {
  return (
    <figure
      sx={{
        position: "relative",
        width: "128px",
        height: ({ lineHeights }) => `calc(128px + ${lineHeights.body}rem)`
      }}
    >
      <Donut variant="progress.default" value={progress} />
      <Heading variant="wishlistValue">{progress == 1 ? "🙏" : value}</Heading>
      <figcaption
        sx={{
          textAlign: "center",
          color: "text",
          fontFamily: "body",
          fontWeight: "body",
          lineHeight: "body"
        }}
      >
        {children}
      </figcaption>
    </figure>
  );
}

export default function Wishlist() {
  return (
    <MainLayout>
      <Heading as="header">Wishlist</Heading>
      <Grid sx={{ margin: "auto" }} gap="2rem" columns={[1, 2]}>
        <Doughnut name="keyboard" value="350 USD" progress={0.1}>
          HHKB Pro Hybrid Type S
        </Doughnut>

        <Doughnut name="font" value="300 USD" progress={1}>
          Professional Fonts
        </Doughnut>

        <Doughnut name="boba" value="&infin; USD" progress={0.95}>
          Boba Tea
        </Doughnut>
      </Grid>
    </MainLayout>
  );
}
