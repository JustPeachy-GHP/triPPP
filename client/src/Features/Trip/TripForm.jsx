import React, { useState } from "react";
import { createTrip } from "../../helpers/trips";

export default function TripForm() {
  const [tripname, settripName] = useState("");
  const [numdays, setNumDays] = useState("");
  const [numtravelers, setNumTravelers] = useState("");
  const [vibeform, setVibeForm] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let newTripObject = {
      tripname: tripname,
      numdays: numdays,
      numtravelers: numtravelers,
      vibeform: vibeform,
    };
    console.log("submit data", newTripObject);
    async function createNewTrip() {
      const result = await createTrip(
        // tripname,
        // numdays,
        // numtravelers,
        // vibeform
        newTripObject
      );
      console.log(result);
      settripName("");
      setNumDays("");
      setNumTravelers("");
      setVibeForm("");
      return result;
    }
    createNewTrip();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
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
        <h3>What's the vibe you're going for?</h3>
        {/* outdoors, chill, party, local, shop*/}
        <fieldset>
          {/* CHILL */}
          {/* <img
            id="chill-img"
            src="https://tinyurl.com/446u8r4f"
            alt="woman relaxing on the beach"
          ></img> */}
          <div>
            <input
              type="radio"
              id="chill"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label for="chill">
              Chill
              {/* <img
                id="chill-img"
                src="https://tinyurl.com/446u8r4f"
                alt="woman relaxing on the beach"
              ></img> */}
            </label>
          </div>
          {/* OUTDOORS */}
          <div>
            <input
              type="radio"
              id="outdoors"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label for="outdoors">
              Outdoors
              {/* <img
                id="outdoors-img"
                src="https://tinyurl.com/3f5zeycb"
                alt="couple in mountains"
              ></img> */}
            </label>
          </div>
          {/* PARTY */}
          <div>
            <input
              type="radio"
              id="party"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label for="party">
              Party
              {/* <img
                id="party-img"
                src="https://tinyurl.com/4yw8yvbr"
                alt="people partying in a club"
              ></img> */}
            </label>
          </div>
          {/* LOCAL */}
          <div>
            <input
              type="radio"
              id="local"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label for="local">
              Local
              {/* <img
                id="local-img"
                src="https://tinyurl.com/5t4sndky"
                alt="man sitting in front of parisian cafe"
              ></img> */}
            </label>
          </div>
          {/* SHOP */}
          <div>
            <input
              type="radio"
              id="shop"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label for="shop">
              Shop{" "}
              {/* <img
                id="shop-img"
                src=" https://tinyurl.com/5n8mwked"
                alt="woman shopping in a store"
              ></img> */}
            </label>
          </div>
          <br />
          {/* hook up event listener to  */}
        </fieldset>
        <button type="Submit">Submit</button>
      </form>
    </div>
  );
}

// how are we going to pass data up to form.jsx?
