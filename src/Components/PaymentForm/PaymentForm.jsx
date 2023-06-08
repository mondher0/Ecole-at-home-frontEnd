/* eslint-disable no-unused-vars */
import React from "react";
import {
  CardElement,
  useStripe,
  useElements,
  AddressElement,
  PaymentElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import "./PaymentForm.css";

const appearance = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
};

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [line1, setline1] = useState("");
  const [line2, setLine2] = useState("");
  const stripe = useStripe();
  const elements = useElements({ appearance });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        address: {
          city,
          country,
          line1,
          line2,
          postal_code: postalCode,
          name,
        },
      },
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:9999/api/payment", {
          amount: 1000,
          id,
        });
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <fieldset className="payment_fs">
      <div className="payment_methods_icons">
        <img src="../assets/payment_method.svg" />
        <img src="../assets/visa.svg" />
        <img src="../assets/master.svg" />
      </div>
      <legend>Paiement sécurisé par carte</legend>
      <form onSubmit={handleSubmit}>
        <AddressElement
          options={{ mode: "shipping" }}
          style={{ base: { fontSize: "160px" } }}
          onChange={(e) => {
            setCity(e.value.address.city);
            setPostalCode(e.value.address.postal_code);
            setline1(e.value.address.line1);
            setLine2(e.value.address.line2);
            setCountry(e.value.address.country);
            setName(e.value.name);
          }}
        />
        <div className="input_container">
          <label htmlFor="Numéro">Numéro de carte :</label>
          <CardNumberElement />
        </div>
        <div className="input_container half">
          <label htmlFor="expiration">Date dexpiration :</label>
          <CardExpiryElement />
        </div>
        <div className="input_container half">
          <label htmlFor="Cryptogramme">Cryptogramme visuel : </label>
          <CardCvcElement />
        </div>
        <button className="login_btn">Valider votre abonnement</button>
        <p className="payment_desc bold">
          Aucun paiement nest effectué, vous serez facturé uniquement après
          avoir assisté au cours
        </p>
        <p className="payment_desc">
          Votre moyen de paiement est sécurisé par Stripe
        </p>
        <p className="payment_desc">
          En passant votre commande, vous acceptez les{" "}
          <span>conditions générales de vente</span>
        </p>
      </form>
    </fieldset>
  );
};

export default PaymentForm;
