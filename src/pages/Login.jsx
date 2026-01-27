import { useState, useContext } from "react"; // useState:maneja estados , useContext para usar el authContext y acceder al login
import { AuthContext } from "../context/AuthContext"; // vive la logica de la autenticacion
import { Link } from "react-router-dom";


// Creamos el componente react llamado Login
function Login() {
  const { login } = useContext(AuthContext); // dame la funcion login del contexto, guarda el token y loguea al user

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // funcion que se ejecuta cuando hace click en login
  async function handleSubmit(e) {
  e.preventDefault();

  const response = await fetch("http://127.0.0.1:5000/api/login", {
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


  // se ejecuta handleSubmit cuando presiona el boton
  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
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
