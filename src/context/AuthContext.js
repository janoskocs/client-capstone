import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  //Takes in previous state and action
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state; //Return original state if all fails
  }
};
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  //Check for existing token and change state based on it
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    //If user exists in localstorage, log them in
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("Authcontext state: ", state);

  //The following will wrap around the app which will provide the value to the components, and dispatch function so that we can change the state with it
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
