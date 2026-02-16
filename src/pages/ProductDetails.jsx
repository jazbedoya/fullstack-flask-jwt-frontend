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
  const [added, setAdded] = useState(false);

  // Cargar productos relacionados
  useEffect(() => {
    if (product?.category) {
      fetchWithAuth(`/external/related?category=${product.category}`)
        .then(setRelated)
        .catch(console.error);
    }
  }, [product]);

  // Manejar añadir al carrito
  function handleAdd() {
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div style={{ padding: "20px" }}>

      {/* 🔙 VOLVER */}
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

      {/* DETALLE PRODUCTO */}
      <div style={{ display: "flex", gap: "40px" }}>
        <img src={product.image} width="300" alt={product.name} />

        <div>
          <h2>{product.name}</h2>
          <p>{product.brand}</p>
          <h3>${product.price}</h3>

          <button
            onClick={handleAdd}
            disabled={added}
            style={{
              backgroundColor: added ? "green" : " #354f6a",
              opacity: added ? 0.8 : 1,
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: added ? "default" : "pointer"
            }}
          >
            {added ? "Añadido al carrito ✔" : "Añadir al carrito"}
          </button>
        </div>
      </div>

      {/* RELACIONADOS */}
      <h3 style={{ marginTop: "40px" }}>Productos relacionados</h3>

      <div
        className="carousel"
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          padding: "10px 0"
        }}
      >
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
