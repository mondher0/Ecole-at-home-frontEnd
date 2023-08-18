/* eslint-disable no-unused-vars */
import React from "react";
import "../css/Payment.css";
import { useParams } from "react-router-dom";
import SubscriptionDetails from "../Components/SubscriptionDetails/SubscriptionDetails";


const Payment = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <div className="container payment_page">
        <div className="details_section">
          <SubscriptionDetails id={id} />
        </div>
      </div>
    </>
  );
};

export default Payment;
