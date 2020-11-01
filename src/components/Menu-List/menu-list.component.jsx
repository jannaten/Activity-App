import React from "react";
import { Link } from "react-router-dom";
import MenuListHolder from "../styles";
const MenuList = ({ style }) => {
  return (
    <ul style={style}>
      <Link to={{ pathname: "/Activity-App/" }}>
        <li style={MenuListHolder.menuListStyle}>Dashboard</li>
      </Link>
      <Link to={{ pathname: "/Activity-App/create" }}>
        <li style={MenuListHolder.menuListStyle}>Create Activities</li>
      </Link>
      <Link to={{ pathname: "/Activity-App/check" }}>
        <li style={MenuListHolder.menuListStyle}>Check all activities</li>
      </Link>
    </ul>
  );
};

export default MenuList;
