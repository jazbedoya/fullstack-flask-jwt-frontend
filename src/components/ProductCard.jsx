import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>{product.brand}</p>
      <strong>${product.price}</strong>

      <button className="add-to-cart-btn" onClick={handleAdd}>
        Add to Carrito
      </button>

      {added && (
        <p style={{ color: "green", marginTop: "8px" }}>
          Producto añadido al carrito
        </p>
      )}
    </div>
  );
}
