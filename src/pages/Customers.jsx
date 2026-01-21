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
  );
}
