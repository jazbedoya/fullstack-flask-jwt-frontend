import { useEffect, useState } from "react"; // para guardar datos en el componente
import { fetchWithAuth } from "../services/api"; // llama al backend envia el token automaticamente
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Dashboard() {
  const [products, setProducts] = useState([]); //la lista de productos que empieza vacia
  const [customers, setCustomers] = useState([]); // NUEVO: lista de usuarios
  const [view, setView] = useState("products");

  //se ejecuta una sola vez cuando el componente aparece
  useEffect(() => {
    if (view === "products") {
      fetchWithAuth("/external") //llama a la APi , envia el token automaticamente
        .then(data => setProducts(data)) //data contiene los productos,setproductodata:guarda los productos en el estado
        .catch(err => console.error("ERROR FETCH:", err));
    }

    if (view === "customers") {
      fetchWithAuth("/customers") // NUEVO: obtiene usuarios registrados
        .then(data => setCustomers(data))
        .catch(err => console.error("ERROR FETCH CUSTOMERS:", err));
    }
  }, [view]);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setView={setView} /> {/* NUEVO */}

      <div style={{ flex: 1 }}>
        <Topbar />

        {view === "products" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
              padding: "20px"
            }}
          >
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {view === "customers" && (
          <div style={{ padding: "20px" }}>
            <h2>Customers</h2>

            <table width="100%" border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.email}</td>
                    <td>{c.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
