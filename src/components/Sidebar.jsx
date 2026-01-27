export default function Sidebar({ setView }) {
  return (
    <aside className="sidebar">
    
      <nav className="sidebar-nav">
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

        <button
          className="sidebar-btn cart-btn"
          onClick={() => setView("cart")}
        >
          View cart
        </button>
      </nav>
    </aside>
  );
}
