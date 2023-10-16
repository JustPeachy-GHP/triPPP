import React from "react";
import { Link } from "react-router-dom";
import "./Journal.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {/* hard code for now */}
          <Link to="/journals">Journals</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
