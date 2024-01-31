import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

function PaginaProtegida() {
  const { auth, cargando } = useAuth();

  //console.log(auth); // auth es la informacion del usuario

  if (cargando) return "Cargando...";

  return (
    <>
      <Header />
      {auth._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
}

export default PaginaProtegida;
