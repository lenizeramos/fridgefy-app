import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./Layout.scss";
import { RecipesProvider } from "../context/RecipesContext";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <RecipesProvider>
          <Toaster />
          <Outlet />
        </RecipesProvider>
      </main>
    </>
  );
}

export default Layout;
