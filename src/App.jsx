// Todo debe de estar rodeado por el BrowserRouter, Routes para agregar diferentes rutas, Route para una sola ruta
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import PaginaProtegida from "./layout/PaginaProtegida";

import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import AdministrarPacientes from "./paginas/AdministrarPacientes";
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassword from "./paginas/CambiarPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

function App() {
  // Cuando usas variables de entorno debes reiniciar el servidor
  // Accedemos a la variable de entorno VITE_BACKEND_URL
  // console.log(import.meta.env.VITE_BACKEND_URL);
  return (
    <BrowserRouter>
      {/* El AuthProvider debe de estar por fuera de las rutas para que los states esten disponibles de manera global en la app */}
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* Carga el componente AuthLayout en la direccion de "/" */}
            <Route path="/" element={<AuthLayout />}>
              {/* Indicamos el index de la ruta */}
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<NuevoPassword />}
              />
            </Route>

            <Route path="/admin" element={<PaginaProtegida />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="cambiar-password" element={<CambiarPassword />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
