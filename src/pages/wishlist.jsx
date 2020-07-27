import React, { useEffect, useState } from "react";
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

import { loadStripe, registerElements } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import MainLayout from "@components/MainLayout";

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

function PaymentModal({ itemValue = 0, closeModal }) {
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
    var amountToDonate = Math.min(amount, itemValue);
    console.info(`🤫 ${amountToDonate}`);
    var response = await fetch(
      `.netlify/functions/stripe?amount=${amountToDonate}`
    );
    var { client_secret } = await response.json();
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
        closeModal(amountToDonate);
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
            setAmount(Math.min(val, itemValue));
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
      <Button variant="secondary" onClick={() => closeModal(0)}>
        Cancel
      </Button>
    </form>
  );
}

function Doughnut({ value, progress, children }) {
  var [openModal, setModalOpen] = useState(true);
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
        onClick={() => setModalOpen(true)}
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
      {openModal && (
        <PaymentModal
          itemValue={value}
          closeModal={function(v = 0) {
            var newProgress = progress + v / value;
            console.log(progress, v, value, newProgress);
            setProgress(Math.min(1, newProgress));
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default function Wishlist() {
  return (
    <MainLayout>
      <Heading as="header">Wishlist (demo)</Heading>
      <Elements stripe={stripePromise}>
        <Grid sx={{ margin: "auto" }} gap="2rem" columns={[1, 2]}>
          <Doughnut name="keyboard" value={350} progress={0.1}>
            HHKB Pro Hybrid Type S
          </Doughnut>

          {/*   <Doughnut name="font" value="300 USD" progress={1}> */}
          {/*     Professional Fonts */}
          {/*   </Doughnut> */}

          {/*   <Doughnut name="boba" value="&infin; USD" progress={0.95}> */}
          {/*     Boba Tea */}
          {/*   </Doughnut> */}
        </Grid>
      </Elements>
    </MainLayout>
  );
}
