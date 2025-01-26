import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./Layout.scss";
import { RecipesProvider } from "../context/RecipesContext";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer/Footer";
import { FridgeProvider } from "../context/FridgeContext";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <RecipesProvider>
          <FridgeProvider>
            <Outlet />
          </FridgeProvider>
        </RecipesProvider>
        <Toaster position="bottom-right" reverseOrder={false} />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
