import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { setone, settwo } from '../../slices/testSlice'
// added a DisplayTest component so you can see the value retrieved from state - "Look ma, no props!"
import DisplayTest from "./DisplayTest";
import ActivityRater from '../Display/ActivityRater'
import DestinationRater from '../Display/DestinationRater'
import BasicModal from "./BasicModal";
import ModalItinerary from "../Itinerary/ModalItinerary"

export default function Test() {
  // getting testVal1 and testVal2 from redux
  console.log(useSelector(state => state.test.testVal1))
  console.log(useSelector(state => state.test.testVal2))

  const navigate = useNavigate()

  // same as above, but retrieving from redux to use as inital state for useState hooks
  const initialVal1 = useSelector(state => state.test.testVal1);
  const initialVal2 = useSelector(state => state.test.testVal2);

  const [val1, setVal1] = useState(initialVal1);
  const [val2, setVal2] = useState(initialVal2);

  // can' useDispatch() directly, have to set it to a variable - same as useNavigate
  const dispatch = useDispatch()

  // on form submit using setone and settwo in testReducer to change the values of testVal1 and testVal2
const handleSubmit = () => {
    dispatch(setone({testVal1: val1}))
    dispatch(settwo({testVal2: val2}))

    // the page resets with the form submit so here we're navigating to another component to show the values changed -- if you look at app.jsx there's a route for /displaytest that points to the DisplayTest component

    navigate("/displaytest")
}

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Val1:
            <input value={val1} onChange={(e) => setVal1(e.target.value)} />
          </label>
          <br />
          <label>
            Val2:
            <input value={val2} onChange={(e) => setVal2(e.target.value)} />
          </label>
          <br />
          <div>
            <button>Submit</button>
          </div>
        </form>

        <DisplayTest />
        <h2>Testing itinerary voting/rater</h2>
        <ActivityRater />

        <h2>Testing destination voting/rater</h2>
        <DestinationRater />

        <BasicModal/>

        <ModalItinerary />

      </div>
    </>
  );
}