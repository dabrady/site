import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

var stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC_KEY);

var ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
    }
    // TODO(dabrady) This won't work until I expose it via Webpack; it resolves to
    //     https://localhost:8000/src/styles/fonts.css
    // {
    // cssSrc: "src/styles/fonts.css"
    // }
  ]
};
export default function Stripe({ children }) {
  return (
    <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
      {children}
    </Elements>
  );
}
