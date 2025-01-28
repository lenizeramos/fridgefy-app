import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./Layout.scss";
import { RecipesProvider } from "../context/RecipesContext";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer/Footer";
import { FridgeProvider } from "../context/FridgeContext";
import { ShoppingListProvider } from "../context/ShoppingListContext";
import { AgentProvider } from "../context/AgentContext";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <RecipesProvider>
          <ShoppingListProvider>
            <FridgeProvider>
              <AgentProvider>
                <Outlet />
              </AgentProvider>
            </FridgeProvider>
          </ShoppingListProvider>
        </RecipesProvider>
        <Toaster position="bottom-right" reverseOrder={false} />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
