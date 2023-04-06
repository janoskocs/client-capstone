import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";

const SignUpPage = () => {
  const [signUpInput, setSignUpInput] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const { signup, error, isLoading } = useSignUp();
  const handleInput = (e) => {
    setSignUpInput({ ...signUpInput, [e.target.name]: e.target.value });
  };
  console.log(signUpInput);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(
      signUpInput.email,
      signUpInput.password,
      signUpInput.first_name,
      signUpInput.last_name
    );
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__title">Sign up</h3>
      <label htmlFor="first_name">First name</label>
      <input
        type="text"
        name="first_name"
        onChange={(e) => handleInput(e)}
        value={signUpInput.first_name}
      />
      <label htmlFor="last_name">Last name</label>
      <input
        type="text"
        name="last_name"
        onChange={(e) => handleInput(e)}
        value={signUpInput.last_name}
      />
      <label htmlFor="title">Email</label>
      <input
        type="email"
        name="email"
        onChange={(e) => handleInput(e)}
        value={signUpInput.email}
      />
      <label htmlFor="content">Password</label>
      <input
        type="password"
        name="password"
        onChange={(e) => handleInput(e)}
        value={signUpInput.password}
      />
      <p>
        Password must contain a lowercase letter, uppercase letter, number, and
        a symbol.
      </p>
      <button disabled={isLoading} type="submit">
        Sign up
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignUpPage;
