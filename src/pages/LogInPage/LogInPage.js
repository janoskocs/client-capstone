import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import "./LogInPage.scss";
import hero from "../../assets/images/hero.gif";
import image1 from "../../assets/images/pic1.png";
import image2 from "../../assets/images/pic2.png";
import image3 from "../../assets/images/pic3.png";

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
    <>
      <section className="login">
        <div className="hero">
          <h1 className="hero__title">Capture every moment.</h1>
          <img className="hero__img" src={hero} alt="Hero" />
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <h3 className="login-form__title">Log in</h3>
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
          {error && <p className="error">{error}</p>}
          <button
            className="login-form__btn"
            disabled={isLoading}
            type="submit"
          >
            Log In
          </button>
        </form>
      </section>
      <section className="landing">
        <div className="landing__wrapper">
          <h3 className="landing__title">Store your memories with emotions</h3>
          <div className="landing__images">
            <img className="landing__img" src={image1} alt="MemoVault" />
            <img className="landing__img" src={image2} alt="MemoVault" />
            <img className="landing__img" src={image3} alt="MemoVault" />
          </div>
        </div>
      </section>
      <p className="footer">
        Thank you for visiting. This is a personal portfolio project. If you
        want to know more visit me at{" "}
        <a href="https://janoskocs.com">https://janoskocs.com</a>
      </p>
    </>
  );
};

export default LogInPage;
