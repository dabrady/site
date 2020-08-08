import React, { useState } from "react";
/** @jsx jsx */
import { Button, Input, css, jsx, useThemeUI } from "theme-ui";
import { CardElement } from "@stripe/react-stripe-js";

import usePayment from "@utils/hooks/usePayment";

function CardInput() {
  var { theme, colorMode } = useThemeUI();
  return (
    <CardElement
      options={{
        style: {
          base: {
            ...css(theme.stripe)(theme),
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

export default function CreditCardForm({ disabled, onPayment, onFailure }) {
  var pay = usePayment();
  var [amount, setAmount] = useState("");

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
      <CardInput />
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
