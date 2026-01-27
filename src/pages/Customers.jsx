import { useEffect, useState } from "react";
import { fetchWithAuth } from "../services/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchWithAuth("/customers")
      .then(data => setCustomers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "24px", maxWidth: "1000px" }}>
      <h2 style={{ marginBottom: "24px" }}>Customers & Orders</h2>

      {customers.map(c => (
        <div
          key={c.id}
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "16px 20px",
            marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px"
            }}
          >
            <div>
              <strong style={{ fontSize: "16px" }}>{c.email}</strong>
              <span
                style={{
                  marginLeft: "10px",
                  padding: "3px 10px",
                  fontSize: "12px",
                  borderRadius: "12px",
                  background: c.role === "admin" ? "#ffe3e3" : "#e3f0ff"
                }}
              >
                {c.role}
              </span>
            </div>

            <span style={{ fontSize: "14px", color: "#555" }}>
              Orders: <b>{c.orders.length}</b>
            </span>
          </div>

          {/* Orders */}
          {c.orders.length === 0 ? (
            <p style={{ color: "#777", fontStyle: "italic" }}>
              No orders yet
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "8px"
              }}
            >
              <thead>
                <tr style={{ background: "#f4f6f8" }}>
                  <th align="left" style={{ padding: "8px" }}>Order</th>
                  <th align="left" style={{ padding: "8px" }}>Total</th>
                  <th align="left" style={{ padding: "8px" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {c.orders.map(o => (
                  <tr key={o.id} style={{ borderTop: "1px solid #eee" }}>
                    <td style={{ padding: "8px" }}>#{o.id}</td>
                    <td style={{ padding: "8px" }}>
                      ${o.total.toFixed(2)}
                    </td>
                    <td style={{ padding: "8px" }}>
                      {new Date(o.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
