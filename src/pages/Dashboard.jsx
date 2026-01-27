import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/api";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Cart from "./Cart";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [view, setView] = useState("products");
  const [category, setCategory] = useState("all");

  // 🔹 cargar productos
  useEffect(() => {
    fetchWithAuth("/external")
      .then(data => setProducts(data))
      .catch(err => console.error("ERROR FETCH PRODUCTS:", err));
  }, []);

  // 🔹 cargar customers
  useEffect(() => {
    if (view === "customers") {
      fetchWithAuth("/customers")
        .then(data => setCustomers(data))
        .catch(err => console.error("ERROR FETCH CUSTOMERS:", err));
    }
  }, [view]);

  // 🔹 filtrar productos por categoría
  const filteredProducts = products.filter(p => {
    if (category === "men") return p.category === "mens-shirts";
    if (category === "women") return p.category === "womens-dresses";
    if (category === "kids") return p.category === "kids";
    return true;
  });

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setView={setView} />

      <div style={{ flex: 1 }}>
        <Topbar />

        {/* ================= PRODUCTS ================= */}
        {view === "products" && (
          <>
            {/* 🔘 BOTONES DE FILTRO */}
            <div style={{ padding: "20px", display: "flex", gap: "10px" }}>
              <button
                className={`filter-btn ${category === "all" ? "active" : ""}`}
                onClick={() => setCategory("all")}
              >
                All
              </button>

              <button
                className={`filter-btn ${category === "men" ? "active" : ""}`}
                onClick={() => setCategory("men")}
              >
                Men
              </button>

              <button
                className={`filter-btn ${category === "women" ? "active" : ""}`}
                onClick={() => setCategory("women")}
              >
                Women
              </button>

              <button
                className={`filter-btn ${category === "kids" ? "active" : ""}`}
                onClick={() => setCategory("kids")}
              >
                Kids
              </button>
            </div>

            {/* 🔲 GRID DE PRODUCTOS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "20px",
                padding: "20px"
              }}
            >
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}

        {/* ================= CUSTOMERS ================= */}
        {view === "customers" && (
          <div style={{ padding: "20px" }}>
            <h2>Customers & Orders</h2>

            {customers.map(c => (
              <div key={c.id} style={{ marginBottom: "30px" }}>
                <h4>{c.email} ({c.role})</h4>

                {c.orders.length === 0 ? (
                  <p>No orders</p>
                ) : (
                  <table width="100%" border="1" cellPadding="10">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Total</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.orders.map(o => (
                        <tr key={o.id}>
                          <td>{o.id}</td>
                          <td>${o.total}</td>
                          <td>{new Date(o.created_at).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ================= CART ================= */}
        {view === "cart" && <Cart />}
      </div>
    </div>
  );
}
