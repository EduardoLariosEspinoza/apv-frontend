import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {
  const { cerrarSesion } = useAuth();

  return (
    <header className="py-10 bg-indigo-600">
      {/* justify-between para hacer que el h1 y el nav se coloquen en la misma fila */}
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">
          Administracion de Pacientes de{" "}
          <span className="text-white font-black">Veterinaria</span>
        </h1>

        {/* justify-content para alinear en row y items-center para alinear en col */}
        <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
          <Link to="/admin" className="text-white text-sm uppercase font-bold">
            Pacietes
          </Link>
          <Link
            to="/admin/perfil"
            className="text-white text-sm uppercase font-bold"
          >
            Perfil
          </Link>

          <button
            type="button"
            className="text-white text-sm uppercase font-bold"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
