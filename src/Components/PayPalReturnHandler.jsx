import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/PayPalReturnHandler.css";
import Navbar from "./Navbar";

const PayPalReturnHandler = () => {
  const [message, setMessage] = useState("Procesando tu pago...");
  const [error, setError] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderPurchase, setOrderPurchase] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    if (token) {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:2000/complete-order?token=${token}`
          );
          const dataOrder = { orderId: response.data.id };
          const dataOrderDetails = response.data;

          const res = await axios.post(
            `http://localhost:2000/track/order`,
            dataOrder
          );

          console.log("ITEMS COMPRADOS PRUEBA DE DATOS", res.data);
          const items = res.data.data.purchase_units[0].items;

          setOrderPurchase(items);
          setOrderDetails(dataOrderDetails);

          setMessage("Pago realizado con exito!");
        } catch (error) {
          console.error("Error capturing order:", error);
          setMessage("Hubo un error procesando la orden.");
          setError(error.message);
        }
      };

      fetchOrderDetails();
    } else {
      setMessage("No payment token found. Unable to process your payment.");
    }
  }, []);

  const buyReturn = () => {
    navigate("/"); // Redirige a la página principal o cualquier otra página
  };
  console.log("Order Details:", orderDetails);
  console.log("ITEMSSSS", orderPurchase);
  return (
    <>
      <Navbar />
      <div className="paypal-return-handler">
        <div className="message">{message}</div>
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
        {orderDetails && (
          <div className="order-details">
            <h2>Detalles del pedido</h2>
            <h3>
              <strong>ID de la Orden:</strong> {orderDetails.id}
            </h3>
            <h3>
              <strong>Monto total:</strong> $
              {orderDetails.purchase_units[0].payments.captures[0].amount.value}
            </h3>
         
            <h3>
              <strong>Fecha del pago:</strong>{" "}
              {orderDetails.purchase_units[0].payments.captures[0].create_time}
            </h3>
            <h3>
              <strong>Email del Comprador:</strong>{" "}
              {orderDetails.payer.email_address}
            </h3>

<br></br>

            <h2>Articulos Comprados.</h2>

{orderPurchase &&
  orderPurchase.map((item, index) => (
    <div key={index} className="itemsPurchase">
      <h3>
        <strong>Nombre del item:</strong> {item.name}
      </h3>
      <h3>
        <strong>Cantidad:</strong> {item.quantity}
      </h3>
      <h3>
        <strong>Precio unitario:</strong> {item.unit_amount.value}{" "}
        {item.unit_amount.currency_code}
      </h3>

    </div>
  ))}
          </div>
        )}

        <button className="buy-again-button" onClick={buyReturn}>
          Volver a comprar
        </button>
      </div>
    </>
  );
};

export default PayPalReturnHandler;
