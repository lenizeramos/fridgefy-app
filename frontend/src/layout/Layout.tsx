import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./Layout.scss";
import { RecipesProvider } from "../context/RecipiesContext";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <RecipesProvider>
          <Outlet />
        </RecipesProvider>
      </main>
    </>
  );
}

export default Layout;
