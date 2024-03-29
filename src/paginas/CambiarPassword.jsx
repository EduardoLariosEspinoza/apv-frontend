import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

function CambiarPassword() {
  const { guardarPassword } = useAuth();

  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: "",
    pwd_nueva: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si alguno de los campos está vacío. Some funciona con arreglos y objetos
    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });

      return;
    }

    if (password.pwd_nueva.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener al menos 6 caracteres",
        error: true,
      });

      return;
    }

    // La respuesta contiene el mensaje y el error recibidos desde el backend
    const respuesta = await guardarPassword(password);

    setAlerta(respuesta);
  };

  const { msg } = alerta;

  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">
        Cambiar Contraseña
      </h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu{" "}
        <span className="text-indigo-600 font-bold">Contraseña</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Contraseña Actual
              </label>
              <input
                type="password"
                name="pwd_actual"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu Contraseña Actual"
                onChange={(e) => {
                  setPassword({ ...password, [e.target.name]: e.target.value });
                }}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nueva Contraseña
              </label>
              <input
                type="password"
                name="pwd_nueva"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu Nueva Contraseña"
                onChange={(e) => {
                  setPassword({ ...password, [e.target.name]: e.target.value });
                }}
              />
            </div>

            <input
              type="submit"
              value="Actualizar Password"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default CambiarPassword;
