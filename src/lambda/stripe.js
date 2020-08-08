// Load any configured environment-specific variables.
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

var API_KEY =
  process.env.CONTEXT == "production"
    ? process.env.STRIPE_API_SECRET_KEY_LIVE
    : process.env.STRIPE_API_SECRET_KEY_TEST;

var stripe = require("stripe")(API_KEY);

export async function handler(event, context) {
  var { amount } = event.queryStringParameters;
  var parsedAmount = parseFloat(amount);
  var finalAmount = parsedAmount * 100;
  console.debug(`[server] intent to pay $${parsedAmount}`);
  var paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      clientSecret: paymentIntent.client_secret
    })
  };
}
