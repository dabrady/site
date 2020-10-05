var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
