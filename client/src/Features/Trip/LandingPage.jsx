import React from "react";
import TripForm from "./TripForm";
import Login from "../Auth/Login";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1> Lets go on a Trippp!</h1>
      <Link to="/tripform">
        <button> Take me on an adventure!</button> <br />{" "}
      </Link>

      <Link to="/login">
        <button> Planning in Progress</button> <br />{" "}
      </Link>

      <Link to="/login">
        <button> Login</button> <br />{" "}
      </Link>

      <br />
    </div>
  );
}
