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
import { useResponsiveValue, useBreakpointIndex } from "@theme-ui/match-media";

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
  var breakpoint = useBreakpointIndex();
  var donutSize = useResponsiveValue([64, 128, 192, 256]);

  console.debug(`[brady] rendering item: ${balance} / ${value}`);
  return (
    <Box>
      <figure
        sx={{
          position: "relative",
          width: "100%",
          display: ["flex", null, null, "block"],
          flexFlow: "row nowrap",
          alignItems: "center",
          justifyContent: "flex-start",
          "& > *": {
            flex: "1 auto"
          },
          margin: ({ lineHeights }) => [
            `0`,
            null,
            null,
            `0 -4rem ${lineHeights.body}rem auto`
          ],
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
            flex: `1 0 ${donutSize}px`,
            color: t => (selected ? "accent" : alpha("text", 0.2)(t))
          }}
        />
        <figcaption
          sx={{
            variant: "text.default",
            position: "relative",
            fontSize: ["1rem", "1.4rem"],
            width: "100%",
            textAlign: ["right", null, null, "center"],
            borderTop: t => selected && "1px solid",
            borderColor: "accent",
            marginLeft: [null, null, null, "calc(50% - 4rem)"]
          }}
        >
          {children}
          {selected && (
            <Heading
              variant="wishlistValue"
              sx={{
                fontSize: ["0.8rem", "1.2rem"],
                position: ["absolute", null, null, "static"],
                top: 0,
                marginLeft: "5px"
              }}
            >
              {progress >= 1 ? (
                "🥳🙏"
              ) : (
                <span>
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
                </span>
              )}
            </Heading>
          )}{" "}
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
          alignContent: ["stretch", "flex-start"],
          alignItems: "space-between",
          justifyContent: "space-between",
          "& > *": {
            flex: "1 100%" // Everyone on their own row
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
            /* maxHeight: ["40vh", "initial"], */
            overflow: "scroll",
            "& > *": {
              flex: ["1 100%", null, null, "0 1 auto"]
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
        {selectedItem && (
          <Stripe>
            <CreditCardForm
              selectedItem={selectedItem}
              onPayment={function(amountToDonate) {
                selectedItem &&
                  updateItemBalance(selectedItem.item_id, amountToDonate).then(
                    () => console.debug("[brady] balance updated")
                  );
              }}
              onFailure={console.error}
            />
          </Stripe>
        )}
      </Flex>
    </MainLayout>
  );
}
