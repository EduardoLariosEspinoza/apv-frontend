import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

function ListadoPacientes() {
  const { pacientes } = usePacientes();

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado de Pacientes
          </h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Tus <span className="text-indigo-600 font-bold">Pacientes</span>
          </p>

          {pacientes.map((paciente) => (
            <Paciente key={paciente._id} paciente={paciente} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Agrega a Tus{" "}
            <span className="text-indigo-600 font-bold">Pacientes</span>
          </p>
        </>
      )}
    </>
  );
}

export default ListadoPacientes;
