import { useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";

import "./SignUpPage.scss";
import image1 from "../../assets/images/avatar1.png";
import image2 from "../../assets/images/avatar2.png";
import image3 from "../../assets/images/avatar3.png";
import image4 from "../../assets/images/avatar4.png";

const SignUpPage = () => {
  const avatar1 =
    "https://firebasestorage.googleapis.com/v0/b/memovault-9a89c.appspot.com/o/moments%2Favatar1.png?alt=media&token=d408c88a-5c2a-40bc-8cba-f54332e66b02";

  const avatar2 =
    "https://firebasestorage.googleapis.com/v0/b/memovault-9a89c.appspot.com/o/moments%2Favatar2.png?alt=media&token=e6dd1587-ccf4-495e-9d8a-83657a532fcf";

  const avatar3 =
    "https://firebasestorage.googleapis.com/v0/b/memovault-9a89c.appspot.com/o/moments%2Favatar3.png?alt=media&token=8eaf288b-bd0d-4b3f-8707-d278a0fb3b9f";

  const avatar4 =
    "https://firebasestorage.googleapis.com/v0/b/memovault-9a89c.appspot.com/o/moments%2Favatar4.png?alt=media&token=54b21ff4-3d5d-4f1f-b8e6-cff9ad06bdf7";
  const [signUpInput, setSignUpInput] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [avatar, setAvatar] = useState(
    "https://firebasestorage.googleapis.com/v0/b/memovault-9a89c.appspot.com/o/moments%2Favatar1.png?alt=media&token=d408c88a-5c2a-40bc-8cba-f54332e66b02"
  );

  const { signup, error, isLoading } = useSignUp();
  const handleInput = (e) => {
    setSignUpInput({ ...signUpInput, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(
      signUpInput.email,
      signUpInput.password,
      signUpInput.first_name,
      signUpInput.last_name,
      avatar
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
      <fieldset className="fieldset">
        <legend>Select your avatar</legend>

        <div className="fieldset__container" onChange={handleChange}>
          <div
            className={
              avatar === avatar1
                ? "fieldset__card fieldset__card--selected "
                : "fieldset__card"
            }
          >
            <label htmlFor="avatar1" className="fieldset__label">
              <img src={image1} alt="Avatar" className="fieldset__img" />
              <input
                className="fieldset__input-radio"
                type="radio"
                id="avatar1"
                name="avatar"
                value={avatar1}
              />
            </label>
          </div>

          <div
            className={
              avatar === avatar2
                ? "fieldset__card fieldset__card--selected "
                : "fieldset__card"
            }
          >
            <label htmlFor="avatar2" className="fieldset__label">
              <img src={image2} alt="Avatar" className="fieldset__img" />
              <input
                className="fieldset__input-radio"
                type="radio"
                id="avatar2"
                name="avatar"
                value={avatar2}
              />
            </label>
          </div>

          <div
            className={
              avatar === avatar3
                ? "fieldset__card fieldset__card--selected "
                : "fieldset__card"
            }
          >
            <label htmlFor="avatar3" className="fieldset__label">
              <img src={image3} alt="Avatar" className="fieldset__img" />
              <input
                className="fieldset__input-radio"
                type="radio"
                id="avatar3"
                name="avatar"
                value={avatar3}
              />
            </label>
          </div>
          <div
            className={
              avatar === avatar4
                ? "fieldset__card fieldset__card--selected "
                : "fieldset__card"
            }
          >
            <label htmlFor="avatar4" className="fieldset__label">
              <img src={image4} alt="Avatar" className="fieldset__img" />
              <input
                className="fieldset__input-radio"
                type="radio"
                id="avatar4"
                name="avatar"
                value={avatar4}
              />
            </label>
          </div>
        </div>
      </fieldset>

      {error && <p className="error">{error}</p>}
      <p>
        Password must contain a lowercase letter, uppercase letter, number, and
        a symbol.
      </p>

      <button disabled={isLoading} type="submit">
        Sign up
      </button>
    </form>
  );
};

export default SignUpPage;
