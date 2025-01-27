import { useState } from "react";
import logo from "../../../public/img/logo.png";
import { NavLink } from "react-router-dom";
import { SignedOut, SignedIn, SignOutButton } from "@clerk/clerk-react";
import './HamburgerNavbar.scss'

function HamburgerNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
          <div className="logoContainer">
            <img src={logo} alt="Logo" />
            <h1>CookUpMagic</h1>
          </div>
        <button
          className={`hamburger ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
        <div className={`menu ${isOpen ? "open" : ""}`}>
            <ul>
              <SignedOut>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "active" : "noActive"
                    }
                  >
                    Home
                  </NavLink>
                </li>
              </SignedOut>
              <li>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) =>
                    isActive ? "active" : "noActive"
                  }
                >
                  Recipes
                </NavLink>
              </li>
              <SignedIn>
                <li>
                  <NavLink
                    to="/shopping-list"
                    className={({ isActive }) =>
                      isActive ? "active" : "noActive"
                    }
                  >
                    Shopping List
                  </NavLink>
                </li>
              </SignedIn>
            </ul>
            <div className="buttonContainer">
              <SignedOut>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    isActive ? "buttonActive" : "button"
                  }
                >
                  <button>Sign in</button>
                </NavLink>
              </SignedOut>
              <SignedIn>
                <SignOutButton>
                  <NavLink to="#" className="button">
                    <button>Logout</button>
                  </NavLink>
                </SignOutButton>
              </SignedIn>
            </div>
          </div>
    </>
  );
}

export default HamburgerNavbar;