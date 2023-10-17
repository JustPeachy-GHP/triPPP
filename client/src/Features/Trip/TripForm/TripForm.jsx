import { createTrip } from "../../../helpers/trips";
import { createNewGroupMemb } from "../../../helpers/groupmembs";
import { useNavigate } from "react-router-dom";
import shopping from "../../../Assets/shopping.jpeg";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./TripForm.css";
import { green } from "@mui/material/colors";

export default function TripForm() {
  const [tripname, settripName] = useState("");
  const [numdays, setNumDays] = useState("");
  const [numtravelers, setNumTravelers] = useState("");
  const [vibeform, setVibeForm] = useState("");
  const navigate = useNavigate();

  // Modal stuff here
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  // Modal stuff ends here

  const user_id = useSelector((state) => state.auth.user_id);

  console.log("my user id", user_id);

  const submitHandler = (e) => {
    e.preventDefault();
    alert("You've submitted your trip!");
    const newTripObject = {
      tripname: tripname,
      numdays: numdays,
      numtravelers: numtravelers,
      vibeform: vibeform,
      user_id: user_id,
    };
    console.log("submit data", newTripObject);

    handleSubmitClick(newTripObject);
  };

  async function createNewTrip(tripObj) {
    const result = await createTrip(tripObj);
    console.log(result);
    return result;
  }

  const handleSubmitClick = async (newTripObject) => {
    const trip = await createNewTrip(newTripObject);
    console.log(trip);

    const newGroupMembObject = {
      trip_id: trip.trip_id,
      user_id: user_id,
    };

    console.log("new group member", newGroupMembObject);
    const memb = await createNewGroupMemb(newGroupMembObject);
    console.log("memb after submit", memb);

    navigate(`/trips/${trip.trip_id}/locations`, { replace: true });
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="scrollable-content">
          <div>
            <form onSubmit={submitHandler}>
              <div className="title">
                <h1> Make A Trip</h1>
                <h3>Tell us more about that dream vacation!</h3>
              </div>
              <br />
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
                onInput="validity.valid||(value='');"
                onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
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
                onInput="validity.valid||(value='');"
                onKeyPress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))"
                placeholder="Number of Days"
                onChange={(e) => setNumDays(e.target.value)}
                value={numdays}
                required
              />{" "}
              <br />
              <br />
              {/* ====================VIBE QUESTIONS============== */}
              <h3>What's the vibe you're going for?</h3>
              {/* outdoors, chill, party, local, shop*/}
              <fieldset>
                {/* ==============CHILL ============*/}
                <div className="vibe-option">
                  <div>
                    <h3>Chill</h3>
                    <label>
                      <input
                        type="radio"
                        id="chill"
                        name="vibe"
                        value={vibeform}
                        onChange={(e) => setVibeForm(e.target.id)}
                      />
                      <img
                        id="vibe-img"
                        src="https://tinyurl.com/446u8r4f"
                        alt="woman relaxing on the beach"
                      ></img>
                      <label htmlFor="chill">
                        <h5>
                          You love to hang out on the beach, go visit a spa, or
                          spend some time with that vacation read. Your trip is
                          all about rest and relaxation.
                        </h5>
                        <br />
                      </label>
                    </label>
                  </div>
                </div>

                {/* ============OUTDOORS============= */}
                <div className="vibe-option">
                  <label htmlFor="outdoors">
                    <h3>Outdoors</h3>
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="outdoors"
                      name="vibe"
                      value={vibeform}
                      onChange={(e) => setVibeForm(e.target.id)}
                    />
                    <img
                      id="vibe-img"
                      src="https://tinyurl.com/3f5zeycb"
                      alt="couple in mountains"
                    ></img>
                  </label>
                  <h5>
                    You live for summer camping trips, ziplining through a
                    jungle, or even just a nice hike. Nothing is better than
                    connecting with nature.
                  </h5>
                </div>
                <br />

                {/* ===========PARTY============= */}
                <div className="vibe-option">
                  <label htmlFor="party">
                    <h3>Party</h3>
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="party"
                      name="vibe"
                      value={vibeform}
                      // style={{ display: "none" }}
                      onChange={(e) => setVibeForm(e.target.id)}
                    />
                    <img
                      id="vibe-img"
                      src="https://tinyurl.com/4yw8yvbr"
                      alt="people partying in a club"
                    ></img>
                  </label>
                  <h5>
                    {" "}
                    You feel the most alive when you're out on the town,
                    experiencing new music, lights, and sounds. Life is all
                    about fun!{" "}
                  </h5>
                </div>
                <br />
                {/* ==========LOCAL============ */}
                <div className="vibe-option">
                  <label htmlFor="local">
                    <h3>Local Culture</h3>
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="local"
                      name="vibe"
                      value={vibeform}
                      onChange={(e) => setVibeForm(e.target.id)}
                    />
                    <img
                      id="vibe-img"
                      src="https://tinyurl.com/5t4sndky"
                      alt="man sitting in front of parisian cafe"
                    ></img>
                  </label>
                  <h5>
                    {" "}
                    What better way to travel than to live like the locals do?
                    You love good food, beautiful sights, and a little history
                    sprinkled in.{" "}
                  </h5>
                </div>
                <br />
                {/* ==========SHOP============ */}
                <div className="vibe-option">
                  <label htmlFor="shop">
                    <h3>Shop</h3>
                  </label>
                  <label>
                    <input
                      type="radio"
                      id="shop"
                      name="vibe"
                      value={vibeform}
                      onChange={(e) => setVibeForm(e.target.id)}
                    />
                    <img
                      id="vibe-img"
                      src={shopping}
                      alt="woman shopping"
                    ></img>
                  </label>
                  <h5>
                    {" "}
                    What's better than coming home with that one-of-a-kind find?
                    You love to remember your travels through the unique pieces
                    you collect.
                  </h5>
                </div>
                <br />
                {/* hook up event listener to  */}
                <button
                  className="button"
                  type="Submit"
                  onClick={handleSubmitClick}
                >
                  Submit
                </button>
              </fieldset>
            </form>
          </div>
          <br />
        </Box>
      </Modal>
    </div>
  );
}

// how are we going to pass data up to form.jsx?
