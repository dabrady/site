// TODO get secret from elsewhere
var stripe = require("stripe")(
  "sk_test_51H9C9cFdjFUWnf7dx4JZyxiL5DJK4pDZhI60enT88OYJ9ujXir49uWfHtg7JZA7vkop8JzPBsZSeECyqVvZkIWil00D4pCt2Ch"
);

export async function handler(event, context) {
  var { amount } = event.queryStringParameters;
  var parsedAmount = parseFloat(amount);
  var finalAmount = parsedAmount * 100;
  console.info(`[server] intent to pay $${parsedAmount}`);
  var paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "usd",
    metadata: { integration_check: "accept_a_payment" }
  });

  console.info(paymentIntent);
  return {
    statusCode: 200,
    body: JSON.stringify({
      client_secret: paymentIntent.client_secret
    })
  };
}
