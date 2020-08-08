import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

var stripePromise = loadStripe(
  "pk_test_51H9C9cFdjFUWnf7defV5IMhGPt25eEoRcNXo1bqIyMvQ1OsMQcf174jaRoiYYL2Mbn2JWGR9KXG3qiFL6p3mFZrr00eh1v542P"
);

export default function Stripe({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
