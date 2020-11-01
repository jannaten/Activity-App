import React, { useState, useEffect } from "react";
import { MobileList, MenuList } from "../";
import HeaderStyle from "../styles";

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
    <nav style={HeaderStyle.navStyle}>
      <strong>ACTIVITY</strong>
      {isMobile ? <MobileList /> : <MenuList style={HeaderStyle.menuStyle} />}
    </nav>
  );
};

export default Header;
