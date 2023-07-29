import logo from "../../assets/erco.png";
import { FC } from "react";
import "./Header.css";

const Header: FC = () => {
  return (
    <div className="nav_container">
      <nav className="nav_bar">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div>Erco Energy Project List</div>
      </nav>
    </div>
  );
};

export default Header;
