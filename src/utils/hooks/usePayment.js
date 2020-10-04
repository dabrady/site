import { useStripe } from "@stripe/react-stripe-js";

export default function usePayment() {
  var stripe = useStripe();

  return function pay({ details, card }) {
    return new Promise(function pay(resolve, reject) {
      if (!stripe || !card) {
        console.error("[pay] Stripe is borken");
        reject(new Error("Stripe is borken"));
      } else {
        var { amount, ...billing_details } = details;

        console.debug("[pay] fetching intent from stripe");
        fetch(`/.netlify/functions/stripe?amount=${amount}`)
          .then(function parse(response) {
            console.debug("[parse] parsing response");
            return response.json();
          })
          .then(function makePayment({ clientSecret }) {
            console.debug("[makePayment] making payment");
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
          })
          .catch(function doSomething(error) {
            console.error("[usePayment:errorHandler] uh oh");
            reject(error);
          });
      }
    });
  };
}
