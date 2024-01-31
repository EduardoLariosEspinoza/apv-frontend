// useContext permite acceder a los valores del context, en este caso del AuthContext
import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

const usePacientes = () => {
  // Extraemos los valores del context AuthContext
  return useContext(PacientesContext);
};

export default usePacientes;
