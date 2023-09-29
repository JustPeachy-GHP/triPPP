import React, { useState } from "react";
import { createTrip } from "../../helpers/trips";

export default function TripForm() {
  const [tripname, settripName] = useState("");
  const [numtravelers, setNumTravelers] = useState("");
  const [numdays, setNumDays] = useState("");
  const [vibeform, setVibeForm] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const API = await createTrip(tripname, numdays, numtravelers);
    if (API.success) {
      console.log("New trip", API.data.newTrip);
      settripName("");
      setNumTravelers("");
      setNumDays("");
    } else {
      console.log("error");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1> Let's find out more about your Trippp </h1>
        <h3> Trip Name</h3>
        <input
          placeholder="Trip Name"
          onChange={(e) => settripName(e.target.value)}
          value={tripname}
        />{" "}
        <br />
        <h3> How many people are you traveling with?</h3>
        <input
          type="number"
          placeholder="Number of Travelers"
          onChange={(e) => setNumTravelers(e.target.value)}
          value={numtravelers}
        />{" "}
        <br />
        <h3> How many days do you want to plan for?</h3>
        <input
          type="number"
          placeholder="Number of Days"
          onChange={(e) => setNumDays(e.target.value)}
          value={numdays}
        />{" "}
        <br />
        <input
          type="checkbox"
          placeholder="VibeCheck"
          onChange={(e) => setVibeForm(e.target.value)}
          value={vibeform}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// how are we going to pass data up to form.jsx?

// const [videocontent, setVideocontent] = useState("");
//   const [image, setImage] = useState("");
//   const [title, setTitle] = useState("");
//   const [timestamp, setTimestamp] = useState("");
//   const [entry, setEntry] = useState("");
