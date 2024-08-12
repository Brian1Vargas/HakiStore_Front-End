import { useState } from "react";
import hakiLogo from "../Images/hakistoreLogo-removebg-preview.png";
import PropTypes from "prop-types";
import "../Styles/Navbar.css";
import axios from 'axios';

export default function Navbar({
  count,
  products,
  setProducts,
  setCarritoCount,
}) {
  const [active, setActive] = useState(false);

  const clearCart = () => {
    setProducts([]);
    setCarritoCount(0);
  };

  const deleteProduct = (product) => {
    const updateProducts = products.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 }
      : item).filter(item => item.id !== product.id || item.quantity > 0);
    setProducts(updateProducts);
    setCarritoCount(count - 1);

  };

  const handlePayment = async () => {
    try {
        const listProducts = products.map(product =>({
          id: product.id,
          name: product.nameProduct,
          price: product.price,
          quantity: product.quantity          
        }));

        const response = await axios.post('http://localhost:2000/pay', { listProducts: listProducts , totalAmount: totalAmount });
        const approvalUrl = response.data.approvalUrl;
        if(approvalUrl)
        window.location.href = approvalUrl;
  
       
    } catch (error) {
        console.error("Error creating order", error);
    }
};

  

  const totalAmount = products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);

  return (
    <>
      <header>
        <img src={hakiLogo} className="LogoHaki" alt="LogoHaki" />
        <p className="header-title">Haki Store</p>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/">Articulos</a></li>
            <li>
              <div className="container-cart-icon" onClick={() => setActive(!active)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon-cart">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <div className="count-products">
                  <span id="contador-productos">{count}</span>
                </div>
              </div>
            </li>
            <div className={`container-cart-products ${active ? "" : "hidden-cart"}`}>
              {products.length ? (
                <>
                  <div className="row-product">
                    {products.map((product) => (
                      <div className="cart-product" key={product.id}>
                        <div className="info-cart-product">
                          <div className="product-details">
                            <img
                              src={product.img}
                              alt={product.nameProduct}
                              className="img-product-carrito"
                              width="150px"
                              height="150px"
                            />
                            <p className="titulo-producto-carrito">
                              {product.nameProduct}
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="icon-close"
                              onClick={() => deleteProduct(product)}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <div className="containerEJM">
                            <span className="cantidad-producto-carrito">
                              Cantidad: {product.quantity}
                            </span>
                            <span className="precio-producto-carrito">
                              ${product.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="cart-total">
                    <h3>Total:</h3>
                    <span className="total-pagar">${totalAmount}</span>
                  </div>
                  <button className="btn-clear-all" onClick={clearCart}>
                    Vaciar Carrito
                  </button>
                  <button className="btn-pay-all" onClick={handlePayment}>
                    Pagar ya
                  </button>
                </>
              ) : (
                <p className="cart-empty">El carrito está vacío</p>
              )}
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
}

Navbar.propTypes = {
  count: PropTypes.number.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nameProduct: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number,
    })
  ).isRequired,
  setProducts: PropTypes.func.isRequired,
  setCarritoCount: PropTypes.func.isRequired,
};


Navbar.defaultProps = {
  count: 0,
  products: [],
  setProducts: () => {},
  setCarritoCount: () => {},
}
