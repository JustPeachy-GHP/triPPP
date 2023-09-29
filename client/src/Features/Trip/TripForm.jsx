import React, { useState } from "react";
import { createTrip } from "../../helpers/trips";
import Form from "./Form";

export default function TripForm() {
  return (
    <div>
      <form>
        <h1> Let's find out more about your Trippp </h1>
        <h3> Trip Name</h3>
        <input placeholder="Trip Name" /> <br />
        <h3> How many people are you traveling with?</h3>
        <input type="number" placeholder="Number of Travelers" /> <br />
        <h3> How many days do you want to plan for?</h3>
        <input type="number" placeholder="Number of Days" /> <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// how are we going to pass data up to form.jsx?
