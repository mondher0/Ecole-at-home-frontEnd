/* eslint-disable no-unused-vars */
import React from "react";
import "../css/Payment.css";
import PaymentForm from "../Components/PaymentForm/PaymentForm";
import SubscriptionDetails from "../Components/SubscriptionDetails/Subscription";

const Payment = () => {
  return (
    <>
      <div className="container payment_page">
        <div className="payment_section">
          <PaymentForm />
        </div>
        <div className="details_section">
          <SubscriptionDetails />
        </div>
      </div>
    </>
  );
};

export default Payment;
