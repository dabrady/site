import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

var stripePromise = loadStripe(
  "pk_test_51H9C9cFdjFUWnf7defV5IMhGPt25eEoRcNXo1bqIyMvQ1OsMQcf174jaRoiYYL2Mbn2JWGR9KXG3qiFL6p3mFZrr00eh1v542P"
);

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
