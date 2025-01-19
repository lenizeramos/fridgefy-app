import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./Layout.scss";

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <h1>Hello</h1>
    </>
  );
}

export default Layout;
