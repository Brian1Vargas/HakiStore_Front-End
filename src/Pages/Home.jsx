import { useState } from "react";
import Navbar from "../Components/Navbar";
import { dataJs } from "../data";
import "../Styles/Home.css";
export default function Home() {
   const [count, setCarritoCount] = useState (0);
   const [products, setProducts] = useState ([]);

  
  const addProducts = (product) =>{
    const productExists = products.find(productItem => productItem.id === product.id);
  
    if (productExists) {
      const productsReviewed = products.map(productMapItem => 
        productMapItem.id === product.id
          ? { ...productMapItem, quantity: (productMapItem.quantity || 1) + 1 }
          : productMapItem
      );
      setProducts(productsReviewed);
      
    } else {
      setProducts([...products, { ...product, quantity: 1 }]);
    }
  
    setCarritoCount(count + 1);
  }
   

   
  return (
    <>
      <Navbar count={count} products={products} setProducts={setProducts} setCarritoCount ={setCarritoCount} />
      <div className="container-home-page">
        <div className="text-home-page">
          <p className="text-Store">Haki Store 2024</p>
          <p className="text-Collection">
            Tienda de artículos GEEK de Costa Rica
          </p>
        </div>
      </div>

      <div className="main-products">
        <h2 className="Title-Categories">Figuras</h2>
        <div className="container-products">
          <div className="products">
            {dataJs.map((product) => (
              <div className="product" key={product.id}>
                <figure>
                <img src={product.img} alt={product.id} />
                </figure>
                
                <h3>{product.nameProduct}</h3>
                <p>${product.price}</p>
                <button onClick={() => addProducts(product)}>Añadir al carrito</button>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
