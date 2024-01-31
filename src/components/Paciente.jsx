import usePacientes from "../hooks/usePacientes";

function Paciente({ paciente }) {
  const { nombre, email, _id, fecha, propietario, sintomas } = paciente;

  const { setEdicion, eliminarPaciente } = usePacientes();

  const formatearFecha = (fecha) => {
    let nuevaFecha;
    if (fecha.includes("T00:00:00.000Z")) {
      nuevaFecha = new Date(fecha.split("T")[0].split("-"));
    } else {
      nuevaFecha = new Date(fecha);
    }
    const opciones = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return nuevaFecha.toLocaleDateString("es-ES", opciones);
  };

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="uppercase font-bold text-indigo-700 my-10">
        Nombre:{" "}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>
      <p className="uppercase font-bold text-indigo-700 my-10">
        Email:{" "}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>
      <p className="uppercase font-bold text-indigo-700 my-10">
        Fecha:{" "}
        <span className="font-normal normal-case text-black">
          {formatearFecha(fecha)}
        </span>
      </p>
      <p className="uppercase font-bold text-indigo-700 my-10">
        Propietario:{" "}
        <span className="font-normal normal-case text-black">
          {propietario}
        </span>
      </p>
      <p className="uppercase font-bold text-indigo-700 my-10">
        Sintomas:{" "}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>

      <div className="flex justify-between my-5">
        <button
          type="button"
          className="bg-indigo-600 py-2 px-10 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
          onClick={() => setEdicion(paciente)}
        >
          Editar
        </button>

        <button
          type="button"
          className="bg-red-600 py-2 px-10 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
          onClick={() => eliminarPaciente(_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Paciente;
