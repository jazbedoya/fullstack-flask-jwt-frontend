import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { fetchWithAuth } from "../services/api";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const product = state?.product;
  const { addToCart } = useContext(CartContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (product?.category) {
      fetchWithAuth(`/external/related?category=${product.category}`)
        .then(setRelated)
        .catch(console.error);
    }
  }, [product]);

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔙 VOLVER AL DASHBOARD */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "20px",
          background: "none",
          border: "none",
          color: "#1a237e",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        ← Volver al catálogo
      </button>

      {/* DETALLE */}
      <div style={{ display: "flex", gap: "40px" }}>
        <img src={product.image} width="300" />

        <div>
          <h2>{product.name}</h2>
          <p>{product.brand}</p>
          <h3>${product.price}</h3>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* RELACIONADOS */}
      <h3 style={{ marginTop: "40px" }}>Productos relacionados</h3>

      <div className="carousel">
        {related.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}