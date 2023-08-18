/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axiosInstance, { baseURl } from "../../utils/utils";

const AddingCart = () => {
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [id, setId] = useState();
  const [Loading, setLoading] = useState(false);
  console.log(paymentMethod);

  // get payment method
  const getPaymentMethod = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${baseURl}/payment/get-payment-methods`
      );
      console.log(response);
      if (response.data.data?.length > 0) {
        setPaymentMethod(true);
      }
      setId(response.data?.data[0]?.id);
      console.log(paymentMethod);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // delete payment method
  const deletePaymentMethod = async () => {
    try {
      const response = await axiosInstance.delete(
        `${baseURl}/payment/remove-payment-method/${id}`
      );
      console.log(response);
      setPaymentMethod(false);
    } catch (error) {
      console.log(error);
    }
  };

  // redirect to stripe
  const redirectToStripe = async () => {
    try {
      const res = await axiosInstance.get(
        `${baseURl}/payment/add-payment-method`
      );
      console.log(res);
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentMethod();
  }, [paymentMethod]);
  return (
    <fieldset
      className="payment_fs"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <legend>Vos information de payment</legend>
      {Loading ? (
        <p
          style={{
            color: "#000",
            fontSize: "1rem",
            fontWeight: "500",
            lineHeight: "1.5",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          Loading...
        </p>
      ) : (
        <>
          <p
            style={{
              color: "#000",
              fontSize: "1rem",
              fontWeight: "500",
              lineHeight: "1.5",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            {paymentMethod
              ? "Votre carte de bancaire est  enregistrée avec stripe"
              : "Votre carte de bancaire n'est pas enregistrée pour le moment Ajouter votre carte bancaire pour assiter au prochains cours Aucun paiement n'est effectué, vous serez facturé uniquement après avoir assisté au cours"}
          </p>
          {paymentMethod && (
            <button
              style={{
                backgroundColor: "red",
              }}
              onClick={deletePaymentMethod}
            >
              Supprimer votre carte
            </button>
          )}
          {!paymentMethod && (
            <button
              style={{
                backgroundColor: "#0078D4",
              }}
              onClick={redirectToStripe}
            >
              Continuer avec stripe
            </button>
          )}
        </>
      )}
    </fieldset>
  );
};

export default AddingCart;
