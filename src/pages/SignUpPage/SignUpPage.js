import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";

const SignUpPage = () => {
  const [signUpInput, setSignUpInput] = useState({
    email: "",
    password: "",
  });

  const { signup, error, isLoading } = useSignUp();
  const handleInput = (e) => {
    setSignUpInput({ ...signUpInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(signUpInput.email, signUpInput.password);
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__title">Sign up</h3>
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
      <button disabled={isLoading} type="submit">
        Sign up
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignUpPage;
