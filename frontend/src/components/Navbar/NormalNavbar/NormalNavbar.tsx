import "./NormalNavbar.scss";
import { NavLink } from "react-router-dom";
import logo from "../../../public/img/logo.png";
import { SignedOut, SignedIn, SignOutButton } from "@clerk/clerk-react";

function NormalNavbar() {
  return (
    <>
      <div className="logoContainer">
        <img src={logo} alt="Logo" />
        <h1>CookUpMagic</h1>
      </div>
      <div className="linksContainer">
        <ul>
          <SignedOut>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "noActive")}
              >
                Home
              </NavLink>
            </li>
          </SignedOut>
          <SignedIn >
          <li>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? "active" : "noActive")}
              >
                Home
              </NavLink>
            </li>
          </SignedIn>
          <li>
            <NavLink
              to="/recipes"
              className={({ isActive }) => (isActive ? "active" : "noActive")}
            >
              Recipes
            </NavLink>
          </li>
          <SignedIn>
            <li>
              <NavLink
                to="/shopping-list"
                className={({ isActive }) => (isActive ? "active" : "noActive")}
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

export default NormalNavbar;
