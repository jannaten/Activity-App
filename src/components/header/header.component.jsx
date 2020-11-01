import React, { useState, useEffect } from "react";
import { MobileList, MenuList } from "../";
import { Link } from "react-router-dom";
import HeaderStyle from "../styles";
import "./header.styles.scss";

const Header = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width : 680px)").matches
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.matchMedia("(max-width : 680px)").matches);
    });
  });

  return (
    <nav className="tracker" style={HeaderStyle.navStyle}>
      <Link to={{ pathname: "/" }}>
        <strong>
          <span className="header">activity</span>
        </strong>
      </Link>
      {isMobile ? <MobileList /> : <MenuList style={HeaderStyle.menuStyle} />}
    </nav>
  );
};

export default Header;
