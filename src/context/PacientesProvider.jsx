import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  // State para editar un paciente
  const [paciente, setPaciente] = useState({});

  const { auth } = useAuth();

  // useEffect para obtener los pacientes del usuario actual
  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/pacientes", config);
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerPacientes();
  }, [auth]); // Cada vez que la informacion del usuario actual cambie se ejecuta el useEffect, por ejemplo porque se cerro la sesion y se inicio con otro usuario

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (paciente.id) {
      try {
        const { data } = await clienteAxios.put(
          `/pacientes/${paciente.id}`,
          paciente,
          config
        );

        // El paciente guardado que tenga el mismo id del paciente editado se reemplaza por el paciente editado
        const pacientesActualizado = pacientes.map((pacienteState) => {
          if (pacienteState._id === data._id) {
            return data;
          } else {
            return pacienteState;
          }
        });

        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await clienteAxios.post(
          "/pacientes",
          paciente,
          config
        );

        // Generamos una copia del paciente guardado en data pero sin los campos createdAt, updatedAt, __v
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = async (id) => {
    const confirmar = confirm("¿Estas seguro de eliminar este paciente?");

    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

        const pacientesActualizado = pacientes.filter((pacienteState) => {
          return pacienteState._id !== id;
        });

        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
