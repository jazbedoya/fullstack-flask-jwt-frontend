import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Cart from "./pages/Cart";

export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" /> : <Login />}
      />

       <Route
        path="/register"
        element={token ? <Navigate to="/dashboard" /> : <Register />}

      />

      <Route
      path="/cart"
      element={token ? <Cart/>: <Navigate to="/" />}
        
      />

      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
