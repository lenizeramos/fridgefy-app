import "../Footer/Footer.scss";
import logo from "../../public/img/logo.png";

const Footer = () => {
  return (
    <footer className="footerContainer">
      <div className="d-flex justify-content-center align-items-center gap-3">
        <div className="logoFooterContainer">
          <img src={logo} alt="Logo" />
        </div>
        <p className="mb-0 text-center">CookUpMagic © 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
