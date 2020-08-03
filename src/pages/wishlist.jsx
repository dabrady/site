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

import { loadStripe, registerElements } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import MainLayout from "@components/MainLayout";
import useWishlist from "@utils/hooks/useWishlist";

var stripePromise = loadStripe(
  "pk_test_51H9C9cFdjFUWnf7defV5IMhGPt25eEoRcNXo1bqIyMvQ1OsMQcf174jaRoiYYL2Mbn2JWGR9KXG3qiFL6p3mFZrr00eh1v542P"
);

function CardSection() {
  var { theme, colorMode } = useThemeUI();
  return (
    <CardElement
      options={{
        style: {
          base: {
            ...css(theme.stripe)(theme),
            iconColor:
              colorMode == "default"
                ? theme.colors.accent
                : theme.colors.modes[colorMode].accent
          },
          invalid: {
            color: "#E25950"
          }
        }
      }}
    />
  );
}

// TODO Reimplement
function PaymentModal({ itemValue = 0, onSubmit }) {
  var stripe = useStripe();
  var elements = useElements();
  var [confirmed, setConfirmed] = useState(false);
  var [amount, setAmount] = useState(1);

  async function handleSubmit(e, money) {
    var amount = parseFloat(money);
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // TODO parameterize payment amount
    // var amountToDonate = Math.min(amount, itemValue);
    var amountToDonate = amount;
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
      <CardSection />
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

function Doughnut({ value, progress, onClick, children }) {
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

  var [wishlist, updateBalance] = useWishlist();
  var [selectedItem, setSelectedItem] = useState(null);

  console.info("[brady] wishlist is currently:", wishlist);
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
      <Elements stripe={stripePromise}>
        <Grid sx={{ margin: "auto" }} gap="2rem" columns={[1, 2]}>
          {wishlist.map(function renderItem(item) {
            var { item_id: itemId, item: itemName, price, balance } = item;
            return (
              <Doughnut
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
              </Doughnut>
            );
          })}
        </Grid>
        <PaymentModal
          selection={selectedItem}
          onSubmit={function(amountToDonate) {
            updateBalance(selectedItem.item_id, amountToDonate);
          }}
        />
      </Elements>
    </MainLayout>
  );
}
