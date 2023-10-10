import { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { fetchSingleTrip } from "../../helpers/trips";
import "../Test/test.css";
import { editIsDecidedTrip } from "../../helpers/trips";

//*** remove when passing in props ***/
const location_id = 2; // pass in with props
const trip_id = 7; // pass in with props

// need props -- trip_id
// if coming from parent component, pass along location_id, decided,
// setDecided, tripLocationId, setTripLocationId

export default function SetDestToggle() {
  const [decided, setDecided] = useState();
  const [tripLocationId, setTripLocationId] = useState("");
  const [content, setContent] = useState(null);

  // if exist, get location and isdecided

  useEffect(() => {
    async function checkIfDecided() {
      try {
        const response = await fetchSingleTrip(trip_id);

        setDecided(response.isdecided);
        setTripLocationId(response.location_id);

        console.log("initial isdecided", response.isdecided);
        console.log("initial tripLocationId", response.location_id);

      } catch (error) {
        console.log(error);
      }
    }
    checkIfDecided();
  }, []);

  useEffect(() => {
    constructContent();
  }, [decided]);

  // and set correct state of toggle slider

  function constructContent() {
    if (decided === true && tripLocationId === location_id) {
      console.log("decided && trip locations should match", tripLocationId, "=", location_id);

      setContent(
        <Tooltip title="Already set" enterDelay="500">
          <label className="switch">
            <input checked type="checkbox" onClick={resetClick} />
            <span className="slider round"></span>
          </label>
        </Tooltip>
      );
    } else if (decided === true && location_id !== tripLocationId) {

      console.log("decided true but location ids don't match", tripLocationId, "!==", location_id);
      console.log("decided:", decided);

      setContent(
        <Tooltip title="Destination is already selected" enterDelay="500">
          <label className="switch">
            <input type="checkbox" disabled />
            <span className="slider round"></span>
          </label>
        </Tooltip>
      );
    } else if (decided !== true) {

      console.log("decided is not true, no destination set", decided);

      setContent(
        <Tooltip title="Toggle me to set your destination." enterDelay="500">
          <label className="switch">
            <input type="checkbox" onClick={handleClick} />
            <span className="slider round"></span>
          </label>
        </Tooltip>
      );

    } else {
      setContent(
        <p>oops, something went wrong</p>
      );
    }
  }

  async function handleClick(e) {
    e.preventDefault()

    setDecided(!decided);
    setTripLocationId(location_id);

    let editTripObject = {
        trip_id: trip_id,
        isdecided: true,
        location_id: location_id
    }

    try {
        const response = await editIsDecidedTrip(
            editTripObject.trip_id,
            editTripObject
        )
        const returnVal=response
        return returnVal
    } catch (error) {
        console.log(error)
    }

  }

  async function resetClick(e) {
    // set isdecided and location_id to null
    e.preventDefault()

    let editTripObject = {
        trip_id: trip_id,
        isdecided: null,
        location_id: null
    }

    try {
        const response = await editIsDecidedTrip(
            editTripObject.trip_id,
            editTripObject
        )
        const returnVal=response

        setDecided(null);
        setTripLocationId(null);

        return returnVal
    } catch (error) {
        console.log(error)
    }
  }

  return (
    // one orange toggle and others gray if isdecided and 
    // location set; only orange toggle can be untoggled

    // if isdecided is false, all will be gray but toggleable

    <div>{content}</div>
  );
}
