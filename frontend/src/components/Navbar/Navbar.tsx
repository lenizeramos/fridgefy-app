import "./Navbar.scss";
import HamburgerNavbar from "./HamburgerNavbar/HamburgerNavbar";
import NormalNavbar from "./NormalNavbar/NormalNavbar";
import { useState, useEffect } from "react";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="menuContainer">
        <nav>{isMobile ? <HamburgerNavbar /> : <NormalNavbar />}</nav>
      </div>
    </>
  );
}

export default Navbar;
