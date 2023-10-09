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
          <Link to="/journal">Journals</Link>
        </li>
        <li>
          <Link to="/journalform">Create</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
