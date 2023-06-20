/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51NGh4pEazXRpw0t7ogpOv0Vx5W7WXWWKTGAqyeSiFIa3hjefGr2BgmUYhBIuc37X4gNtgUWE8L17tUTGDNhwhnNY0089x2uOUx";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({test}) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm test = {test} />
    </Elements>
  );
};

export default StripeContainer;
