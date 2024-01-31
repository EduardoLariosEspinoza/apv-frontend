import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  /* Retornar solo un fragment, no genera mas codigo html innecesario ejemplo, solo retornar un h1 en lugar de un h1 dentro de un div */
  return (
    <>
      {/* md:grid - Cuando el tamaño de la pantalla sea de mas de 768px o medium, se hara efectivo el display: grid */}
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
        {/* Outlet es un componente de react-router-dom que permite renderizar los componentes hijos de AuthLayout, lo que la ruta padre tenga de hijos se cargara aqui */}
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
