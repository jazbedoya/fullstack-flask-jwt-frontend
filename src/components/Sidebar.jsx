export default function Sidebar({ setView }) {
  return (
    <div className="sidebar">
      <h2>Shop Admin</h2>

      <button
        className="sidebar-btn"
        onClick={() => setView("products")}
      >
        Products
      </button>

      <button
        className="sidebar-btn"
        onClick={() => setView("customers")}
      >
        Customers
      </button>
    </div>
  );
}
