import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import "../Test/test.css";

//*** remove when passing in props ***/
// const location_id = 2; // pass in with props
// const trip_id = 7; // pass in with props

// need props -- trip_id
// if coming from parent component, pass along location_id, decided,
// setDecided, tripLocationId, setTripLocationId

export default function SetDestToggle({ onDecidedStateChange }) {
  const [decided, setDecided] = useState(false);
  
  async function handleClick() {
    setDecided(true);
    onDecidedStateChange(true);
  }

  async function resetClick() {
    setDecided(false);
    onDecidedStateChange(false)
  }

  return (
    <div>
      {
        decided ?
        (
          <Tooltip title="Already set" enterDelay="500">
            <label className="switch">
              <input checked type="checkbox" onClick={resetClick} />
              <span className="slider round"></span>
            </label>
          </Tooltip>
        )
        :
        (
          <Tooltip title="Toggle me to set your destination." enterDelay="500">
            <label className="switch">
              <input type="checkbox" onClick={handleClick} />
              <span className="slider round"></span>
            </label>
          </Tooltip>
        )
      }
    </div>
  );
}
