// useContext permite acceder a los valores del context, en este caso del AuthContext
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  // Extraemos los valores del context AuthContext
  return useContext(AuthContext);
};

export default useAuth;
