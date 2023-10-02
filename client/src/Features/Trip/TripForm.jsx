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
        <h3>What's the vibe you're going for?</h3>
        {/* outdoors, chill, party, local, shop*/}
        <fieldset>
          {/* CHILL */}
          <img
            id="chill-img"
            src="https://tinyurl.com/446u8r4f"
            alt="woman relaxing on the beach"
          ></img>
          <div>
            <input type="radio" id="chill" name="drone" value="huey" checked />
            <label for="chill">Chill</label>
          </div>
          {/* OUTDOORS */}
          <img
            id="outdoors-img"
            src="https://tinyurl.com/3f5zeycb"
            alt="couple in mountains"
          ></img>
          <div>
            <input type="radio" id="outdoors" name="drone" value="outdoors" />
            <label for="outdoors">Outdoors</label>
          </div>
          {/* PARTY */}
          <img
            id="party-img"
            src="https://tinyurl.com/4yw8yvbr"
            alt="people partying in a club"
          ></img>
          <div>
            <input type="radio" id="party" name="party" value="party" />
            <label for="party">Party</label>
          </div>
          {/* LOCAL */}
          <img
            id="local-img"
            src="https://tinyurl.com/5t4sndky"
            alt="man sitting in front of parisian cafe"
          ></img>
          <div>
            <input type="radio" id="local" name="drone" value="local" />
            <label for="local">Local</label>
          </div>
          {/* SHOP */}
          <img
            id="shop-img"
            src=" https://tinyurl.com/5n8mwked"
            alt="woman shopping in a store"
          ></img>
          <div>
            <input type="radio" id="shop" name="drone" value="shop" />
            <label for="shop">Shop</label>
          </div>
          <br />
          <input
            type="checkbox"
            placeholder="VibeCheck"
            onChange={(e) => setVibeForm(e.target.value)}
            value={vibeform}
          />
          <br />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

// how are we going to pass data up to form.jsx?
