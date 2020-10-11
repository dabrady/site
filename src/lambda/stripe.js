console.debug(`CONTEXT is: ${process.env.CONTEXT}`);
console.debug(
  `STRIPE_SECRET_KEY is: ${process.env.STRIPE_SECRET_KEY.substring(0, 7)}`
);
var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function handler(event, context) {
  console.debug(`CONTEXT is: ${process.env.CONTEXT}`);
  console.debug(
    `STRIPE_SECRET_KEY is: ${process.env.STRIPE_SECRET_KEY.substring(0, 7)}`
  );
  var { amount } = event.queryStringParameters;
  var parsedAmount = parseFloat(amount);
  var finalAmount = parsedAmount * 100;
  console.debug(`intent to pay $${parsedAmount}`);
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
