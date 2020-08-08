import React from "react";
import { css, useThemeUI } from "theme-ui";
import { CardElement } from "@stripe/react-stripe-js";

export default function CreditCardForm() {
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
