import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
/** @jsx jsx */
import {
  Button,
  Box,
  Donut,
  Input,
  Grid,
  Heading,
  css,
  jsx,
  useThemeUI
} from "theme-ui";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Stripe from "@components/Stripe";
import MainLayout from "@components/MainLayout";
import CreditCardForm from "@components/CreditCardForm";
import useWishlist from "@utils/hooks/useWishlist";
import useThemeToggle from "@utils/hooks/useThemeToggle";

function WishlistItem({ value, progress, onClick, children }) {
  var [progress, setProgress] = useState(progress);
  return (
    <div>
      <figure
        sx={{
          position: "relative",
          width: "128px",
          height: ({ lineHeights }) => `calc(128px + ${lineHeights.body}rem)`,
          ":hover": {
            cursor: "pointer",
            h2: {
              color: "bright"
            }
          }
        }}
        onClick={onClick}
      >
        <Donut variant="progress.default" value={progress} />
        <Heading variant="wishlistValue">
          {progress >= 1 ? "🙏" : `${value} USD`}
        </Heading>
        <figcaption
          sx={{
            textAlign: "center",
            color: "text",
            fontFamily: "body",
            fontWeight: "body",
            lineHeight: "body",
            ":hover": {
              cursor: "default"
            }
          }}
        >
          {children}
        </figcaption>
      </figure>
    </div>
  );
}

export default function Wishlist() {
  var toggleTheme = useThemeToggle();
  var [selectedItem, setSelectedItem] = useState(null);
  // TODO(dabrady) A better way to lazy init `selecteItem`?
  var [wishlist, updateItemBalance] = useWishlist({
    onFirstLoad: useCallback(
      function setInitialSelection(wishlist) {
        setSelectedItem(wishlist[0]);
      },
      [wishlist]
    )
  });

  return (
    <MainLayout>
      <Heading
        as="header"
        sx={{ display: "inline-block", paddingRight: "25px" }}
      >
        Wishlist (demo)
      </Heading>
      <Button
        sx={{ display: "inline-block" }}
        variant="secondary"
        onClick={toggleTheme}
      >
        Toggle theme
      </Button>
      <Grid sx={{ margin: "auto" }} gap="2rem" columns={[1, 2]}>
        {wishlist.map(function renderItem(item) {
          if (item == wishlist[0])
            console.info("[brady] rerendering wishlist items");
          var { item_id: itemId, item: itemName, price, balance } = item;
          return (
            <WishlistItem
              key={itemId}
              selected={_.get(selectedItem, "item_id") == itemId}
              value={parseInt(price)}
              progress={balance / price}
              onClick={function markSelected() {
                if (_.get(selectedItem, "item_id") == itemId) return;
                console.log(`'${itemName}' selected`);
                setSelectedItem(item);
              }}
            >
              {itemName}
            </WishlistItem>
          );
        })}
      </Grid>
      <Stripe>
        <CreditCardForm
          selection={selectedItem}
          onPayment={function(amountToDonate) {
            updateItemBalance(selectedItem.item_id, amountToDonate);
          }}
          onFailure={console.error}
        />
      </Stripe>
    </MainLayout>
  );
}
