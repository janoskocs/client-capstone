import { useState } from "react";

const LogInPage = () => {
  const [signUpInput, setSignUpInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setSignUpInput({ ...signUpInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(signUpInput.email, signUpInput.password);
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__title">Log in</h3>
      <label htmlFor="title">Email</label>
      <input
        type="email"
        name="email"
        onChange={(e) => handleInput(e)}
        value={signUpInput.email}
      />
      <label htmlFor="content">Content</label>
      <input
        type="password"
        name="password"
        onChange={(e) => handleInput(e)}
        value={signUpInput.password}
      />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LogInPage;
