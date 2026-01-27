import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { fetchWithAuth } from "../services/api"; // para enviar el pedido al backend

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // calcular el total del carrito
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // función que crea el pedido en el backend
  async function handleCheckout() {
    try {
      // enviamos el carrito y el total al backend
      await fetchWithAuth("/orders", {
        method: "POST",
        body: JSON.stringify({
          items: cart,
          total: total
        })
      });

      // limpiamos el carrito si todo salió bien
      clearCart();
      alert("Order placed successfully ");
    } catch (error) {
      console.error(error);
      alert("Error placing order ");
    }
  }

  // si el carrito está vacío
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your cart is empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {/* Lista de productos en el carrito */}
      <div className="cart-list">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div>
              <strong>{item.name}</strong>
              <p>
                ${item.price} × {item.quantity}
              </p>
            </div>

            <div className="cart-item-actions">
              <span className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </span>

              {/* eliminar producto del carrito */}
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen del carrito */}
      <div className="cart-summary">
        <h3>
          Total: <span>${total.toFixed(2)}</span>
        </h3>

        {/* botón para confirmar el pedido */}
        <button className="checkout-btn" onClick={handleCheckout}>
          Pay Now
        </button>

        {/* botón para limpiar el carrito */}
        <button className="clear-btn" onClick={clearCart}>
          Clear cart
        </button>

        {/* métodos de pago (solo visual) */}
        <div className="payment-methods">
          <span>We accept:</span>
          <div className="cards">
            💳 Visa &nbsp; 💳 MasterCard &nbsp; 💳 AmEx
          </div>
        </div>
      </div>
    </div>
  );
}
