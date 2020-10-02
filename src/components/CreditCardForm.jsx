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

function ResetButton({ onClick }) {
  return (
    <button
      type="button"
      sx={{
        border: 0,
        cursor: "pointer",
        background: "transparent",
        svg: {
          fill: "bright"
        },
        ":hover": {
          svg: {
            fill: "accent",
            transitionProperty: "fill",
            transitionDuration: "0.2s"
          }
        }
      }}
      onClick={onClick}
    >
      <svg width="32px" height="32px" viewBox="0 0 32 32">
        <path
          /* fill="#FFF" */
          d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
        />
      </svg>
    </button>
  );
}

function ErrorMessage({ children }) {
  return (
    <div
      sx={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        padding: "0 15px",
        marginTop: "0px",
        width: "100%",
        transform: "translateY(-15px)",

        variant: "text.littleMessage",
        lineHeight: "unset",

        opacity: 0,
        animation: "fade 150ms ease-out",
        animationDelay: "50ms",
        animationFillMode: "forwards",
        "@keyframes fade": {
          from: {
            opacity: 0,
            transform: "scale3D(0.95, 0.95, 0.95)"
          },
          to: {
            opacity: 1,
            transform: "scale3D(1, 1, 1)"
          }
        },

        svg: {
          marginRight: "10px",
          "& .cross": {
            fill: "background"
          },
          "& .circle": {
            fill: "text"
          }
        }
      }}
      role="alert"
    >
      <svg width="16" height="16" viewBox="0 0 17 17">
        <path
          className="circle"
          d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
        />
        <path
          className="cross"
          d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
        />
      </svg>
      {children}
    </div>
  );
}

function SuccessfulPayment({ onReset }) {
  return (
    <div>
      <div>Payment successful</div>
      <div>
        Thanks for giving! Check your email for a receipt (if you asked for
        one).
      </div>
      <ResetButton onClick={onReset} />
    </div>
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
    <SuccessfulPayment onReset={reset} />
  ) : (
    <form
      sx={{
        color: "text",
        fontFamily: "body",
        fontWeight: "body",
        lineHeight: "body",

        /* paddingTop: "50px", */
        /* maxWidth: ["100%", "50%"] */
        flex: "1 100%"
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

      {cardError && <ErrorMessage>{cardError.message}</ErrorMessage>}

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
