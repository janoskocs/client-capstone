import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const LogInPage = () => {
  const { login, error, isLoading } = useLogin();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(loginInput.email, loginInput.password);
  };
  return (
    <form className="form" onSubmit={handleLogin}>
      <h3 className="form__title">Log in</h3>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        onChange={(e) => handleInput(e)}
        value={loginInput.email}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => handleInput(e)}
        value={loginInput.password}
      />
      <button disabled={isLoading} type="submit">
        Log In
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LogInPage;
