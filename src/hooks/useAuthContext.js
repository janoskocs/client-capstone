import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("This must be used inside a provider");
  }
  return context;
};

export default useAuthContext;
