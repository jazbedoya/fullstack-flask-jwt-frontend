import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Topbar() {
  const { logout, user } = useContext(AuthContext);

  return (
    <header className="topbar">
     
      <div className="topbar-left">
        <h2 className="topbar-title">
          Bienvenido{user?.name ? `, ${user.name}` : ""} 
        </h2>
        
      </div>

     
      <div className="topbar-actions">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
