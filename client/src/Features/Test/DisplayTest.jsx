import { useSelector } from "react-redux";

// component will show value of testVal1 and testVal2 from testSlice
// if you navigate first to /displaytest you will see that you have the intial
// values, but if you start at /test and submit two other values,
// when you are brought to the DisplayTest component, your new values will
// be displayed

export default function DisplayTest() {

  const displayVal1 = useSelector(state => state.test.testVal1);
  const displayVal2 = useSelector(state => state.test.testVal2);

  return (
    <>
      <div>
        <h2>Val1: {displayVal1}</h2>
        <h2>Val2: {displayVal2}</h2>
      </div>
    </>
  );
}