import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1> Lets go on a Trippp!</h1>
      <Link to="/tripform">
        <button> Take me on an adventure!</button> <br />{" "}
      </Link>

      <Link to="/userlanding">
        <button> Planning in Progress</button> <br />{" "}
      </Link>


      <br />
    </div>
  );
}
