import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/user/login`,
        {
          email,
          password,
        }
      );
      setIsLoading(false);
      setError(false);

      //Save use to local storage
      // data is an object of email and token from the server {email: , token: }
      localStorage.setItem("user", JSON.stringify(data));
      //Once user signed up, log them in and send this "LOGIN" action to update the context of the app with the email and token
      dispatch({ type: "LOGIN", payload: data });
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
      console.log(error);
    }
  };

  return { login, error, isLoading };
};
