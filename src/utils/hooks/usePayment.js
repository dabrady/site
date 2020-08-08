import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function usePayment() {
  var stripe = useStripe();
  var elements = useElements();

  return function pay(amount) {
    return new Promise(function pay(resolve, reject) {
      if (!stripe || !elements || !amount) {
        reject(new Error("Stripe is borken"));
      } else {
        fetch(`/.netlify/functions/stripe?amount=${amount}`)
          .then(function parse(response) {
            return response.json();
          })
          .then(function makePayment({ clientSecret }) {
            // TODO attach metadata about item
            return stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                  name: "Anonymous"
                }
              }
            });
          })
          .then(function handlePayment({ error, paymentIntent }) {
            if (error) {
              console.error("[handlePayment]", error.message);
              reject(error);
            } else {
              console.debug("[handlePayment] paymentIntent:", paymentIntent);

              if (paymentIntent.status == "succeeded") {
                console.info(`Successfully donated $${amount}`);
                resolve(amount, paymentIntent);
              } else {
                console.error("Nope:", paymentIntent.status);
                reject(paymentIntent.status);
              }
            }
          });
      }
    });
  };
}
