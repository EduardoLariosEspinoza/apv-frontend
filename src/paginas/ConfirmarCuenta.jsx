// useParams es un hook que nos permite acceder a los parámetros de la URL
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
// axios es una librería que nos permite hacer peticiones HTTP
import clienteAxios from "../config/axios"; // clienteAxios ya tiene importado axios, por lo que no es necesario importarlo de nuevo en este archivo

function ConfirmarCuenta() {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();

  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;

        // axios.get() == axios(), si es distinto a get, se debe especificar
        const { data } = await clienteAxios(url);

        setCuentaConfirmada(true);
        setAlerta({ msg: data.msg, error: false });
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
    };

    confirmarCuenta();

    setCargando(false);
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu {""}
          <span className="text-black">Cuenta</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {/* Si cargando es igual a false, muestra la alerta */}
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
}

export default ConfirmarCuenta;
