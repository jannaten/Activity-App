import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="header">
    <Link className="logo-container" to="/">
      <strong>ACTIVITY</strong>
    </Link>
    <div className="options">
      <Link className="option" to="/">
        Dashboard
      </Link>
      <Link className="option" to="/create">
        Create activities
      </Link>
      <Link className="option" to="/check">
        Check all activities
      </Link>
    </div>
  </div>
);

export default Header;
