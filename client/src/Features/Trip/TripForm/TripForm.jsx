import { useState } from "react";
// import "./tripform.css";
import { createTrip } from "../../../helpers/trips";
import { createNewGroupMemb } from "../../../helpers/groupmembs";
import { useNavigate } from "react-router-dom";
import shopping from "../../../Assets/shopping.jpeg";
import { useSelector } from "react-redux";

export default function TripForm() {
  const [tripname, settripName] = useState("");
  const [numdays, setNumDays] = useState("");
  const [numtravelers, setNumTravelers] = useState("");
  const [vibeform, setVibeForm] = useState("");
  const navigate = useNavigate();

  const user_id = useSelector((state) => state.auth.user_id)

  console.log("my user id", user_id)

  // hardcoding dummy data for a user_id

  const submitHandler = (e) => {
    e.preventDefault();
    alert("You've submitted your trip!");
    let newTripObject = {
      tripname: tripname,
      numdays: numdays,
      numtravelers: numtravelers,
      vibeform: vibeform,
      user_id: user_id
    };
    console.log("submit data", newTripObject);

    createNewTrip();
  };

  async function createNewTrip(tripObj) {
    const result = await createTrip(tripObj);
    console.log(result);

    return result;
  }

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    let newTripObject = {
      tripname: tripname,
      numdays: numdays,
      numtravelers: numtravelers,
      vibeform: vibeform,
      user_id: user_id
    };
    console.log("submit data", newTripObject);

    const trip = await createNewTrip(newTripObject);
    console.log(trip);


    let newGroupMembObject = {
      trip_id: trip.trip_id,
      user_id: user_id
    }

    console.log("new group member", newGroupMembObject)
    const memb = await createNewGroupMemb(newGroupMembObject)
    console.log("memb after submit", memb)

    // navigate(`/${trip.trip_id}/locations`);
    navigate(`/trips/${trip.trip_id}/locations`, {replace: true});
  };


  return (
    <div>
      <form onSubmit={handleSubmitClick}>
        <h1> Let's find out more about your Trippp </h1>
        <h3> Trip Name</h3>
        <input
          placeholder="Trip Name"
          onChange={(e) => settripName(e.target.value)}
          value={tripname}
          required
        />{" "}
        <br />
        <h3> How many people are in your party?</h3>
        <input
          type="number"
          min="1"
          oninput="validity.valid||(value='');"
          onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
          placeholder="Number of Travelers"
          onChange={(e) => setNumTravelers(e.target.value)}
          value={numtravelers}
          required
        />{" "}
        <br />
        <h3> How many days do you want to plan for?</h3>
        <input
          type="number"
          min="1"
          oninput="validity.valid||(value='');"
          onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
          placeholder="Number of Days"
          onChange={(e) => setNumDays(e.target.value)}
          value={numdays}
          required
        />{" "}
        <br />
        {/* ====================VIBE QUESTIONS============== */}
        <h3>What's the vibe you're going for?</h3>
        {/* outdoors, chill, party, local, shop*/}
        <fieldset>
          {/* ==============CHILL ============*/}
          <div className="vibe-option">
            <div>
              <input
                type="radio"
                id="chill"
                name="vibe"
                value={vibeform}
                onChange={(e) => setVibeForm(e.target.id)}
              />
              <label htmlFor="chill">
                Chill
                <img
                  id="vibe-img"
                  src="https://tinyurl.com/446u8r4f"
                  alt="woman relaxing on the beach"
                ></img>
              </label>
            </div>
          </div>

          {/* ============OUTDOORS============= */}
          <div className="vibe-option">
            <input
              type="radio"
              id="outdoors"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label htmlFor="outdoors">
              Outdoors
              <img
                id="vibe-img"
                src="https://tinyurl.com/3f5zeycb"
                alt="couple in mountains"
              ></img>
            </label>
          </div>

          {/* ===========PARTY============= */}
          <div className="vibe-option">
            <input
              type="radio"
              id="party"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label htmlFor="party">
              Party
              <img
                id="vibe-img"
                src="https://tinyurl.com/4yw8yvbr"
                alt="people partying in a club"
              ></img>
            </label>
          </div>

          {/* ==========LOCAL============ */}
          <div className="vibe-option">
            <input
              type="radio"
              id="local"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label htmlFor="local">
              Local Culture
              <img
                id="vibe-img"
                src="https://tinyurl.com/5t4sndky"
                alt="man sitting in front of parisian cafe"
              ></img>
            </label>
          </div>
          {/* ==========SHOP============ */}
          <div className="vibe-option">
            <input
              type="radio"
              id="shop"
              name="vibe"
              value={vibeform}
              onChange={(e) => setVibeForm(e.target.id)}
            />
            <label htmlFor="shop">
              Shop <img id="vibe-img" src={shopping} alt="woman shopping"></img>
            </label>
          </div>
          <br />
          {/* hook up event listener to  */}
        </fieldset>
        <button type="Submit" onClick={handleSubmitClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

// how are we going to pass data up to form.jsx?
