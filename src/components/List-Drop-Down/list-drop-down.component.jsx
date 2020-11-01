import React from "react";
import { Link } from "react-router-dom";
import ListHolder from "../styles";

const ListDropDown = ({ style, setActive }) => {
  return (
    <ul style={style}>
      <Link to={{ pathname: "/Activity-App/" }}>
        <li style={ListHolder.listStyle} onClick={() => setActive(false)}>
          Dashboard
        </li>
      </Link>
      <Link to={{ pathname: "/Activity-App/create" }}>
        <li style={ListHolder.listStyle} onClick={() => setActive(false)}>
          Create Activities
        </li>
      </Link>
      <Link to={{ pathname: "/Activity-App/check" }}>
        <li style={ListHolder.listStyle} onClick={() => setActive(false)}>
          Check all activities
        </li>
      </Link>
    </ul>
  );
};

export default ListDropDown;
