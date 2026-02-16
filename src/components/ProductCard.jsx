import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  function handleAdd(e) {
    e.stopPropagation(); //
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div
      className="card"
      onClick={() =>
        navigate(`/product/${product.id}`, {
          state: { product }
        })
      }
      style={{ cursor: "pointer" }}
    >
      <img src={product.image} alt={product.name} />
      <h4>{product.name}</h4>
      <p>{product.brand}</p>
      <strong>${product.price}</strong>

     <button
        className="add-to-cart-btn"
        onClick={handleAdd}
        style={{
          backgroundColor: added ? "green" : "#007bff",
          color: "white"
        }}
      >
        {added ? "Añadido al carrito ✔" : "Añadir al carrito"}
      </button>


      {added && <p style={{ color: "green" }}>Añadido ✔</p>}
    </div>
  );
}