import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
/** @jsx jsx */
import {
  Box,
  Donut,
  Flex,
  Input,
  Heading,
  css,
  jsx,
  useThemeUI
} from "theme-ui";
import { alpha } from "@theme-ui/color";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Stripe from "@components/Stripe";
import MainLayout from "@components/MainLayout";
import CreditCardForm from "@components/CreditCardForm";
import useWishlist from "@utils/hooks/useWishlist";
import useThemeToggle from "@utils/hooks/useThemeToggle";

function WishlistItem({
  selected,
  balance,
  value,
  progress,
  onClick,
  children
}) {
  console.debug(`[brady] rendering item: ${balance} / ${value}`);
  return (
    <Box sx={{ position: "relative" }}>
      <Heading variant="wishlistValue">
        <small
          sx={{
            position: "absolute",
            top: t => `calc(-${t.lineHeights.body}rem + 5px)`,
            textAlign: "center",
            width: "47%",
            color: alpha("text", 0.5)
          }}
        >
          {parseInt(balance)} /
        </small>
        {progress >= 1 ? "🙏" : `${value} USD`}
      </Heading>
      <figure
        sx={{
          position: "relative",
          width: "128px",
          margin: ({ lineHeights }) => `0 auto ${lineHeights.body}rem auto`,
          /* height: ({ lineHeights }) => `calc(128px + ${lineHeights.body}rem)`, */
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
        <figcaption
          sx={{
            variant: "text.default",
            textAlign: "center",
            ":hover": {
              cursor: "default"
            },

            borderBottom: t => selected && "3px solid",
            borderColor: "accent"
          }}
        >
          {children}
        </figcaption>
      </figure>
    </Box>
  );
}

export default function Wishlist() {
  var toggleTheme = useThemeToggle();
  var [selectedItem, setSelectedItem] = useState(null);
  // TODO(dabrady) A better way to lazy init `selectedItem`?
  var [wishlist, updateItemBalance] = useWishlist({
    onFirstLoad: useCallback(
      function setInitialSelection(wishlist) {
        console.debug("[brady] setting initial selection");
        setSelectedItem(wishlist[0]);
      },
      [wishlist]
    )
  });

  console.debug(`[brady] wishlist is:`, wishlist);

  return (
    <MainLayout>
      <Flex
        sx={{
          height: "100%",
          flexFlow: "row wrap",
          /* alignItems: "center", */
          justifyContent: "center",
          "& > *": {
            boxSizing: "border-box",
            flex: "auto"
          }
        }}
      >
        <Heading as="header" sx={{ flex: "1 100%" }} onClick={toggleTheme}>
          Wishlist (demo)
        </Heading>
        {console.debug("[brady] rendering wishlist items") ||
          wishlist.map(function renderItem(item) {
            var { item_id: itemId, item: itemName, price, balance } = item;
            return (
              <WishlistItem
                key={itemId}
                selected={_.get(selectedItem, "item_id") == itemId}
                value={parseInt(price)}
                progress={balance / price}
                balance={balance}
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
        <Stripe>
          <CreditCardForm
            onPayment={function(amountToDonate) {
              selectedItem &&
                updateItemBalance(selectedItem.item_id, amountToDonate).then(
                  () => console.debug("[brady] balance updated")
                );
            }}
            onFailure={console.error}
          />
        </Stripe>
      </Flex>
    </MainLayout>
  );
}
