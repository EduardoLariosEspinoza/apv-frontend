import { useState, createContext, useEffect } from "react";
import clienteAxios from "../config/axios";

// La ventaja de usar context es que los states que se crean en el context estan disponibles de manera global en la app, no es necesario pasar props a los componentes hijos para que tengan acceso a los states

const AuthContext = createContext();

// const { children } = props;
// children es el contenido que esta dentro de AuthProvider en App.jsx
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenticarUsuario = async () => {
      // El token va a estar disponible en todas las rutas de la app ya que esta en el context
      const token = localStorage.getItem("token");

      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/veterinarios/perfil", config);
        setAuth(data);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }

      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const actualizarDatos = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarios/perfil/${datos._id}`;

      const { data } = await clienteAxios.put(url, datos, config);

      return {
        msg: "Datos actualizados correctamente",
        error: false,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const guardarPassword = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = "/veterinarios/actualizar-password";
      const { data } = await clienteAxios.put(url, datos, config);

      return {
        msg: data.msg,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  return (
    /* En value se pasan los valores que se van a compartir con los componentes hijos, ya que no todos los states se van a compartir, puedes pasar cualquier cosa que quieras compartir como funciones, objetos, etc */
    /* Aqui se guardan los datos que entraran en el context AuthContext */
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarDatos,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
