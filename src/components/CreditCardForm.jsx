import React, { useState } from "react";
/** @jsx jsx */
import chroma from "chroma-js";
import { Button, Input, css, jsx, useColorMode, useThemeUI } from "theme-ui";
import { CardElement } from "@stripe/react-stripe-js";

import Stripe from "@components/Stripe";
import usePayment from "@utils/hooks/usePayment";
import { getColorFromTheme } from "@utils/theme";

export function CardInput() {
  var { theme, colorMode } = useThemeUI();
  return (
    <CardElement
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
              color: "bright",
              fontFamily: "Roboto", //"body", // TODO(dabrady) Figure out why font is unavailable in Stripe iframe, and fix it
              fontWeight: "body",
              fontSize: "16px", // Need to specify absolute size because Stripe :P
              fontSmoothing: "antialiased",
              lineHeight: "body",

              "::placeholder": {
                //alpha("accent", 0.5)
                color: ({ colors }) => {
                  return chroma(colors.text)
                    .alpha(0.5)
                    .css();
                }
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

export function DonationInput({ setConfirmed }) {
  var [amount, setAmount] = useState("");
  return (
    <InputRow
      id="amount"
      name="amount"
      label="Donate$"
      type="number"
      placeholder="1"
      value={amount}
      autocomplete={true}
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
        setConfirmed && setConfirmed(false);
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
function InputRow({
  id,
  label,
  type,
  placeholder,
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
      />
    </Row>
  );
}

function EmailInput() {
  return (
    <InputRow
      id="donation-email"
      label="Receipt?"
      type="email"
      placeholder="your-email@example.com"
      autocomplete={true}
    />
  );
}

export default function CreditCardForm({ disabled, onPayment, onFailure }) {
  var pay = usePayment();

  var [confirmed, setConfirmed] = useState(false);
  var buttonVariant = disabled
    ? "disabled"
    : confirmed
    ? "primary"
    : "secondary";

  function handleSubmit(e, money) {
    console.info("[CreditCardForm#handleSubmit]");
    e.preventDefault();
    var amount = parseFloat(money);

    // TODO parameterize payment amount
    // var amountToDonate = Math.min(amount, itemValue);
    var amountToDonate = amount || 1;
    console.info(`🤫 ${amountToDonate}`);

    pay(amountToDonate)
      .then(onPayment)
      .catch(onFailure);
  }

  return (
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
        <DonationInput setConfirmed={setConfirmed} />
        <EmailInput />
      </FieldSet>
      <FieldSet>
        <Row>
          <Stripe>
            <CardInput />
          </Stripe>
        </Row>
      </FieldSet>
      <Button
        variant={buttonVariant}
        sx={{ marginRight: "10px" }}
        disabled={disabled}
      >
        {/* Fix this */}
        {/* onClick={ */}
        {/*   confirmed */}
        {/*     ? e => handleSubmit(e, amount) */}
        {/*     : e => { */}
        {/*         e.preventDefault(); */}
        {/*         amount > 0 && setConfirmed(true); */}
        {/*       } */}
        {/* } */}
        {/* {confirmed ? `DONATE $${amount}` : "Confirm donation"} */}
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
