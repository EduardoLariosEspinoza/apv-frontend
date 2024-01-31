import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function NuevoPassword() {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();

  const { token } = params;

  useEffect(() => {
    // La funcion se declara y ejecuta dentro del useEffect porque este codigo se debe ejecutar cuando el componente se monte
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({ msg: "Coloca tu Nuevo Password", error: false });
        setTokenValido(true);
      } catch (error) {
        setAlerta({ msg: "Hubo un error con el enlace", error: true });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setAlerta({ msg: "Campo Vacio", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({ msg: data.msg, error: false });
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Cambia tu {""}
          <span className="text-black">Password</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                Ingresa el Nuevo Password
              </label>
              <input
                type="password"
                placeholder="Nuevo Password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Actualizar Password"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-14 hover:cursor-pointer hover:bg-indigo-800 md:w-auto mx-auto block"
            />
          </form>
        )}

        {passwordModificado && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Iniciar Sesion
          </Link>
        )}
      </div>
    </>
  );
}

export default NuevoPassword;
