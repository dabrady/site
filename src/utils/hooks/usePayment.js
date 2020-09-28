import { useStripe } from "@stripe/react-stripe-js";

export default function usePayment() {
  var stripe = useStripe();

  return function pay({ details, card }) {
    return new Promise(function pay(resolve, reject) {
      if (!stripe || !card) {
        reject(new Error("Stripe is borken"));
      } else {
        var { amount, ...billing_details } = details;

        fetch(`/.netlify/functions/stripe?amount=${amount}`)
          .then(function parse(response) {
            return response.json();
          })
          .then(function makePayment({ clientSecret }) {
            // TODO attach metadata about item
            return stripe.confirmCardPayment(clientSecret, {
              payment_method: { card, billing_details },
              receipt_email: billing_details.email
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
                resolve({ amount, paymentIntent });
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
