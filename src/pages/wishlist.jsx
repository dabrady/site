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
import { useResponsiveValue } from "@theme-ui/match-media";

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
  var donutSize = useResponsiveValue([64, 128, 192]);

  console.debug(`[brady] rendering item: ${balance} / ${value}`);
  return (
    <Box>
      <figure
        sx={{
          position: "relative",
          width: "100%",
          display: ["flex", "flex", "block"],
          flexFlow: "row nowrap",
          alignItems: "center",
          /* alignContent: "space-between", */
          justifyContent: "flex-start",
          "& > *": {
            /* flex: "0 1 auto" */
            /* flex: "1 0px" */
          },
          margin: ({ lineHeights }) => [
            `0`,
            `0`,
            `0 -3.2rem ${lineHeights.body}rem auto`
          ],
          /* height: ({ lineHeights }) => `calc(128px + ${lineHeights.body}rem)`, */
          ":hover": {
            cursor: "pointer"
          },
          "h2, figcaption": {
            color: _ => (selected ? "bright" : "body")
          }
        }}
        onClick={onClick}
      >
        <Donut
          variant="progress.default"
          size={donutSize}
          value={progress}
          sx={{
            color: t => (selected ? "accent" : alpha("text", 0.2)(t))
          }}
        />
        {selected && (
          <Heading
            variant="wishlistValue"
            sx={{
              left: `${donutSize}px`
            }}
          >
            {progress >= 1 ? (
              "🥳🙏"
            ) : (
              <text>
                <small
                  sx={{
                    /* position: "absolute", */
                    /* top: t => `calc(-${t.lineHeights.body}rem + 5px)`, */
                    /* textAlign: "center", */
                    /* width: "47%", */
                    color: alpha("text", 0.5)
                  }}
                >
                  {parseInt(balance)} /
                </small>
                {` ${value} USD`}
              </text>
            )}
          </Heading>
        )}
        <figcaption
          sx={{
            variant: "text.default",
            textAlign: "right",
            width: "100%",
            /* ":hover": { */
            /*   cursor: "default" */
            /* }, */

            borderTop: t => selected && "1px solid",
            borderColor: "accent"

            /* paddingLeft: "15px" */
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
    <MainLayout
      sx={{
        "& *": { boxSizing: "border-box" }
      }}
    >
      <Flex
        sx={{
          height: "100%",
          flexFlow: "row wrap",
          /* alignItems: "center", */
          /* justifyContent: "center", */
          "& > *": {
            flex: "1 100%"
          }
        }}
      >
        <Heading as="header" onClick={toggleTheme}>
          Wishlist (demo)
        </Heading>
        <Flex
          sx={{
            flexFlow: "row wrap",
            justifyContent: "flow-start",
            maxHeight: "40vh",
            overflow: "scroll",
            "& > *": {
              flex: ["1 100%", "1 100%", "0 1 auto"]
            }
          }}
        >
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
        </Flex>
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
