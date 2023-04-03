import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <h1>MemoVault</h1>
      </Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
};

export default Navigation;
