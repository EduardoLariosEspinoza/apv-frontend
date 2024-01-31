/* eslint-disable react/prop-types */
const Alerta = ({ alerta }) => {
  return (
    /* Hacer un degradado hacia derecha que se activa con bg-gradient-to-r */
    <div
      className={`${
        alerta.error
          ? "from-red-400 to-red-600"
          : "from-indigo-400 to-indigo-600"
      } bg-gradient-to-r text-center p-3 rounded-xl text-white font-bold uppercase text-sm mb-10`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
