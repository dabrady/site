import React, { useState } from "react";
/** @jsx jsx */
import chroma from "chroma-js";
import { Button, Input, css, jsx, useColorMode, useThemeUI } from "theme-ui";
import { alpha } from "@theme-ui/color";
import { CardElement, useElements } from "@stripe/react-stripe-js";

import usePayment from "@utils/hooks/usePayment";
import { getColorFromTheme } from "@utils/theme";

export function CardInput({ onChange }) {
  var { theme } = useThemeUI();
  return (
    <CardElement
      onChange={onChange}
      sx={{
        width: "100%",
        padding: "11px 15px 11px 0",

        "&.StripeElement--webkit-autofill": {
          background: "transparent !important"
        }
      }}
      options={{
        style: {
          base: {
            ...css({
              fontFamily: "Roboto", //"body", // TODO(dabrady) Figure out why font is unavailable in Stripe iframe, and fix it
              fontWeight: "body",
              fontSize: "16px", // Need to specify absolute size because Stripe :P
              fontSmoothing: "antialiased",
              lineHeight: "body",

              color: "text",
              ":-webkit-autofill": {
                color: "text"
              },

              "::placeholder": {
                // Matches theme.text.input::placeholder
                color: ({ colors }) =>
                  chroma(colors.accent)
                    .alpha(0.6)
                    .css()
              }
            })(theme),
            iconColor: theme.colors.accent
          },
          invalid: {
            color: "red"
          }
        }
      }}
    />
  );
}

function FieldSet({ children }) {
  // TODO(dabrady) Make the boxshadow work with darkmode
  var [colorMode, _] = useColorMode();
  return (
    <fieldset
      sx={{
        margin: "0 15px 20px",
        padding: 0,
        borderStyle: "none",
        borderRadius: "4px",
        boxShadow: function(theme) {
          var bgColor = chroma(getColorFromTheme(theme, "background"));
          var shadow = chroma(getColorFromTheme(theme, "shadow"));

          return `
              0 6px 9px ${
                // Feather the shadow into the background
                bgColor
                  .darken()
                  .alpha(0.06)
                  .css()
              },
              0 2px 5px ${
                // Actual shadow
                shadow.alpha(0.08).css()
              },
              inset 0 1px 0 ${
                // Top edge highlight
                bgColor.brighten(0.6).css()
              }`;
        }
      }}
    >
      {children}
    </fieldset>
  );
}

function Row({ children }) {
  return (
    <div
      sx={{
        display: "flex",
        alignItems: "center",
        marginLeft: "15px",
        "& + &": {
          borderTop: "1px solid",
          borderColor: "muted"
        }
      }}
    >
      {children}
    </div>
  );
}
function Field({
  id,
  label,
  type,
  placeholder,
  onChange,
  required = null,
  autocomplete = false
}) {
  return (
    <Row>
      {label && (
        <label
          htmlFor={id}
          sx={{
            variant: "text.default",
            width: "15%",
            minWidth: "70px",
            padding: "11px 0",
            color: "bright",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autocomplete ? "on" : "off"}
        sx={{ variant: "text.input" }}
        onChange={onChange}
      />
    </Row>
  );
}

function CardField({ onChange }) {
  return (
    <Row>
      <CardInput onChange={onChange} />
    </Row>
  );
}

export default function CreditCardForm({ disabled, onPayment, onFailure }) {
  var pay = usePayment();
  var elements = useElements();

  var [donationConfirmed, setDonationConfirmed] = useState(false);
  var [cardComplete, setCardComplete] = useState(false);
  var [processingPayment, setProcessingPayment] = useState(false);
  var [paymentIntent, setPaymentIntent] = useState(null);
  var [cardError, setCardError] = useState(null);
  var [donationDetails, setDonationDetails] = useState({
    email: null,
    amount: ""
  });

  var buttonVariant = disabled
    ? "disabled"
    : donationConfirmed
    ? "primary"
    : "secondary";

  function handleSubmit(e) {
    e.preventDefault();
    console.debug("[CreditCardForm#handleSubmit]");

    var card = elements.getElement(CardElement);

    if (cardError || !cardComplete) {
      card.focus();
      return;
    }

    console.debug("card complete, making payment request");
    setProcessingPayment(true);

    // NOTE(dabrady) Don't let them overpay!
    // var amountToDonate = Math.min(amount, itemValue);
    // var amount = parseFloat(donationDetails.amount) || 1;
    console.info(`🤫 ${donationDetails.amount}`);

    pay({ details: donationDetails, card })
      .then(({ amount, paymentIntent }) => {
        setProcessingPayment(false);
        setPaymentIntent(paymentIntent);
        onPayment(amount);
      })
      .catch(error => {
        setProcessingPayment(false);
        onFailure(error);
      });
  }

  function reset() {
    setCardError(null);
    setProcessingPayment(false);
    setPaymentIntent(null);
    setDonationDetails({ email: null, amount: "" });
  }

  return paymentIntent ? (
    <div>
      <div>Payment successful</div>
      <div>
        Thanks for giving! Check your email for a receipt (if you asked for
        one).
      </div>
    </div>
  ) : (
    <form
      sx={{
        color: "text",
        fontFamily: "body",
        fontWeight: "body",
        lineHeight: "body",

        paddingTop: "50px",
        maxWidth: ["100%", "50%"]
      }}
      onSubmit={handleSubmit}
    >
      <FieldSet>
        <Field
          id="amount"
          name="amount"
          label="Donate$"
          type="number"
          placeholder="1"
          value={donationDetails.amount}
          autocomplete={true}
          onChange={function sanitizeInput(e) {
            // Allow input clearing
            if (!e.target.value) {
              setDonationDetails({ ...donationDetails, amount: "" });
            } else if (/^[0-9]*$/.test(e.target.value)) {
              // Only allow numbers
              // Cap input at itemValue
              var val = parseInt(e.target.value);
              var amt = val; //Math.min(val, itemValue);
              setDonationDetails({ ...donationDetails, amount: amt });
            }
            setDonationConfirmed && setDonationConfirmed(false);
          }}
        />

        <Field
          id="donation-email"
          label="Receipt?"
          type="email"
          placeholder="your-email@example.com"
          autocomplete={true}
          onChange={function saveEmail(e) {
            setDonationDetails({ ...donationDetails, email: e.target.value });
          }}
        />
      </FieldSet>
      <FieldSet>
        <CardField
          onChange={function setCardState({ error, complete }) {
            console.debug("[brady] setting card state");
            setCardError(error);
            setCardComplete(complete);
          }}
        />
      </FieldSet>

      <Button
        variant={buttonVariant}
        sx={{ marginRight: "10px" }}
        disabled={disabled}
      >
        {/* Fix this */}
        {/* onClick={ */}
        {/*   donationConfirmed */}
        {/*     ? e => handleSubmit(e, amount) */}
        {/*     : e => { */}
        {/*         e.preventDefault(); */}
        {/*         amount > 0 && setDonationConfirmed(true); */}
        {/*       } */}
        {/* } */}
        {/* {donationConfirmed ? `DONATE $${amount}` : "Confirm donation"} */}
      </Button>
      <Button
        variant="secondary"
        onClick={function cancel(e) {
          e.preventDefault();
          setDonationConfirmed(false);
        }}
      >
        Cancel
      </Button>
    </form>
  );
}
