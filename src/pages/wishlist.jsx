/** @jsxImportSource theme-ui */

import { useCallback, useState } from "react";
import _ from "lodash";
import { Box, Donut, Flex, Heading, Spinner } from "theme-ui";
import { alpha } from "@theme-ui/color";
import { useResponsiveValue } from "@theme-ui/match-media";

import Stripe from "@components/Stripe";
import StripeBadge from "@components/StripeBadge";
import MainLayout from "@components/MainLayout";
import CreditCardForm from "@components/CreditCardForm";
import useWishlist from "@utils/hooks/useWishlist";
import useSystemTheme from '@utils/hooks/useSystemTheme';

function WishlistItem({
  selected,
  balance,
  value,
  progress,
  onClick,
  children
}) {
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
            borderTop: _ => selected && "1px solid",
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
                  <small sx={{ color: alpha("text", 0.5)}}>
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

function Nothing() {
  return (
    <Box
      sx={{
        textAlign: "center",
        animation: "fade 200ms ease-out",

        "@keyframes fade": {
          from: {
            opacity: 0,
            transform: "scale3D(0.95, 0.95, 0.95)"
          },
          to: {
            opacity: 1,
            transform: "scale3D(1, 1, 1)"
          }
        }
      }}
    >
      <Heading
        sx={{
          variant: "text.heading",
          fontSize: ["1.4rem", "1.4rem", "2rem", "2rem"],
          textAlign: "center"
        }}
      >
        My life is complete!
      </Heading>
      <span
        sx={{
          display: "block",
          variant: "text.default",
          marginBottom: 6,
          textAlign: "center"
        }}
      >
        Thanks for giving! There's nothing more I want, but you can give me more
        money if you'd like.
      </span>
    </Box>
  );
}

// TODO(dabrady) I've noticed this makes several requests to the wishlist on page load.
// Figure out why and stop it; probably has something to do with component rendering.
// TODO(dabrady) Consider caching wishlist in session cookie, which is refreshed on donate.
export default function Wishlist() {
  useSystemTheme();
  var spinnerSize = useResponsiveValue([64, 128, 192, 256]);
  var [loaded, setLoaded] = useState(false);
  var [selectedItem, setSelectedItem] = useState(null);
  // TODO(dabrady) A better way to lazy init `selectedItem`?
  var [wishlist, updateItemBalance] = useWishlist({
    onFirstLoad: useCallback(function setInitialSelection(wishlist) {
      setLoaded(true);
      setSelectedItem(wishlist[0]);
    }, [])
  });

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
        <Heading as="header">
          things I want
        </Heading>
        <Flex
          sx={{
            flexFlow: "row wrap",
            justifyContent: "flow-start",
            // TODO(dabrady) Consider restricting height for long lists
            /* maxHeight: ["40vh", "initial"], */
            overflow: "scroll",
            "& > *": {
              flex: ["1 100%", null, null, "0 1 auto"]
            }
          }}
        >
          {!loaded ? (
            <Spinner
              sx={{ color: "accent" }}
              title="loading desires"
              size={spinnerSize}
            />
          ) : wishlist.length <= 0 ? (
            <Nothing />
          ) : (
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
                    console.debug(`'${itemName}' selected`);
                    setSelectedItem(item);
                  }}
                >
                  {itemName}
                </WishlistItem>
              );
            })
          )}
        </Flex>
        {loaded && (
          <Stripe>
            <CreditCardForm
              selectedItem={selectedItem}
              onPayment={function(amountToDonate) {
                selectedItem &&
                  updateItemBalance(selectedItem.item_id, amountToDonate).then(
                    () => console.debug("[brady] balance updated")
                  );
              }}
            />
            <StripeBadge/>
          </Stripe>
        )}
      </Flex>
    </MainLayout>
  );
}
