import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

const Navigation = () => {
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="nav">
      <Link to="/">
        <h1>MemoVault</h1>
      </Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>

      <button onClick={handleLogout}>Log out</button>
    </nav>
  );
};

export default Navigation;
