import { useState } from "react";
import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";

function AdministrarPacientes() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row">
      <button
        type="button"
        className="uppercase bg-indigo-600 text-white font-bold p-3 rounded-md mx-10 mb-10 md:hidden"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? "Ocultar Formulario" : "Mostrar Formulario"}
      </button>
      <div
        className={`${
          mostrarFormulario ? "block" : "hidden"
        } md:block md:w-1/2 lg:w-2/5`}
      >
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-2/5">
        <ListadoPacientes />
      </div>
    </div>
  );
}

export default AdministrarPacientes;
