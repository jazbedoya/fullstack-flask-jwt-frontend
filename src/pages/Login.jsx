import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (!response.ok) {
      alert("Email o contraseña incorrectos");
      return;
    }

    const data = await response.json();
    login(data.token);
  }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Esribe tu email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Escribe tu contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>

        <p className="auth-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
