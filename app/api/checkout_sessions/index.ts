const params: Stripe.Checkout.SessionCreateParams = {
  submit_type: "payment",
  payment_method_types: ["card"],
  line_items: [
    {
      name: "Custom amount donation",
      amount: formatAmountForStripe(amount, CURRENCY),
      currency: CURRENCY,
      quantity: 1,
    },
  ],
  success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
};
