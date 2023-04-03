import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navigation = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="nav">
      <Link to="/">
        <h1>MemoVault</h1>
      </Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}

      {user && (
        <>
          <p>{user.email}</p> <button onClick={handleLogout}>Log out</button>{" "}
        </>
      )}
    </nav>
  );
};

export default Navigation;
