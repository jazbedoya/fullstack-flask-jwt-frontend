import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Topbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="topbar">
      <button onClick={logout}>Logout</button>
    </div>
  );
}
