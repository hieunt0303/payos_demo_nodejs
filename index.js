const express = require("express");
const PayOS = require("@payos/node");

const payos = new PayOS(
  "006c8266-7572-4a6a-bc98-f16f76e35e6c",
  "4633a448-d845-4408-9850-6164a5e220fa",
  "ef3480331e0874401851c28e6db520b02139c2684e6475d91e4941cc0e6718ff"
);
const app = express();
app.use(express.static("public"));
app.use(express.json())

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-payment-link", async (req, res) => {
  const order = {
    amount: 10000,
    description: "thanh toan mi tom",
    orderCode: 2,
    returnUrl: `${YOUR_DOMAIN}/success.html`,
    cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
  };
  const paymentLink = await payos.createPaymentLink(order);

  res.redirect(303, paymentLink.checkoutUrl);
});
// https://56fd-115-78-235-79.ngrok-free.app/receive-webhook
app.post("/receive-webhook", async (req, res) => {
  console.log(req.body);
  res.json();
});

app.listen(3000, () => console.log("Running on port 3000"));
