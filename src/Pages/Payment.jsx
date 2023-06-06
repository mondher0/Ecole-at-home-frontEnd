/* eslint-disable no-unused-vars */
import React from "react";
import "../css/Payment.css";
import { useParams } from "react-router-dom";
import PaymentForm from "../Components/PaymentForm/PaymentForm";
import SubscriptionDetails from "../Components/SubscriptionDetails/SubscriptionDetails";

const Payment = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <div className="container payment_page">
        <div className="payment_section">
          <PaymentForm />
        </div>
        <div className="details_section">
          <SubscriptionDetails id={id} />
        </div>
      </div>
    </>
  );
};

export default Payment;
