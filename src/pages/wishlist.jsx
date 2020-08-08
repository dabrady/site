import React, { useEffect, useState } from "react";
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
  useThemeUI,
  useColorMode
} from "theme-ui";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Stripe from "@components/Stripe";
import MainLayout from "@components/MainLayout";
import CreditCardForm from "@components/CreditCardForm";
import useWishlist from "@utils/hooks/useWishlist";

// TODO Reimplement
function PaymentModal({ itemValue = 0, onSubmit }) {
  var stripe = useStripe();
  var elements = useElements();
  var [confirmed, setConfirmed] = useState(false);
  var [amount, setAmount] = useState("");

  async function handleSubmit(e, money) {
    var amount = parseFloat(money);
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // TODO parameterize payment amount
    // var amountToDonate = Math.min(amount, itemValue);
    var amountToDonate = amount || 1;
    console.info(`🤫 ${amountToDonate}`);

    var response = await fetch(
      `/.netlify/functions/stripe?amount=${amountToDonate}`
    );
    var { client_secret } = await response.json();
    // TODO attach metadata about item
    var { error, paymentIntent } = await stripe.confirmCardPayment(
      client_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Anonymous"
          }
        }
      }
    );

    if (error) {
      console.error("[client]", error.message);
    } else {
      console.info(paymentIntent);
      if (paymentIntent.status == "succeeded") {
        console.log(`Successfully donated $${amountToDonate}`);
        onSubmit(amountToDonate);
        // closeModal(amountToDonate);
      } else {
        console.log("Nope:", paymentIntent.status);
      }
    }
    // closeModal(amountToDonate);
  }

  var disabled = !stripe || !amount;
  var buttonVariant = disabled
    ? "disabled"
    : confirmed
    ? "primary"
    : "secondary";
  return (
    <form
      sx={{
        paddingTop: "50px"
      }}
      onSubmit={handleSubmit}
    >
      <Input
        sx={{ color: "bright", maxWidth: "20%", marginBottom: "15px" }}
        placeholder="$1"
        name="amount"
        id="amount"
        type="number"
        value={amount}
        onChange={function sanitizeInput(e) {
          // Allow input clearing
          if (!e.target.value) {
            setAmount("");
          } else if (/^[0-9]*$/.test(e.target.value)) {
            // Only allow numbers
            // Cap input at itemValue
            var val = parseInt(e.target.value);
            var amt = val; //Math.min(val, itemValue);
            setAmount(amt);
          }
          setConfirmed(false);
        }}
      />
      <CreditCardForm />
      <Button
        variant={buttonVariant}
        sx={{ marginRight: "10px" }}
        disabled={disabled}
        onClick={
          confirmed
            ? e => handleSubmit(e, amount)
            : e => {
                e.preventDefault();
                amount > 0 && setConfirmed(true);
              }
        }
      >
        {confirmed ? `DONATE $${amount}` : "Confirm donation"}
      </Button>
      <Button
        variant="secondary"
        onClick={function cancel(e) {
          e.preventDefault();
          setConfirmed(false);
        }}
      >
        Cancel
      </Button>
    </form>
  );
}

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
        /* onClick={() => setModalOpen(true)} */
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
  var [colorMode, setColorMode] = useColorMode();
  function otherMode() {
    return (colorMode == "default" && "dark") || "default";
  }

  var [selectedItem, setSelectedItem] = useState(null);
  var [wishlist, updateItemBalance] = useWishlist({
    onFirstLoad: function setInitialSelection(wishlist) {
      setSelectedItem(wishlist[0]);
    }
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
        onClick={() => setColorMode(otherMode())}
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
        <PaymentModal
          selection={selectedItem}
          onSubmit={function(amountToDonate) {
            updateItemBalance(selectedItem.item_id, amountToDonate);
          }}
        />
      </Stripe>
    </MainLayout>
  );
}
