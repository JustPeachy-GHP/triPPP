import { Link } from "react-router-dom";

export default function Navbar() {
  console.log("hi");

  return (

    <div className="navBar" id="navbar">
      <Link to="/home">Home </Link> <br></br>
   
      <Link to="/">Home </Link>  <br></br>
      <Link to="/locations"> Location </Link> <br></br>
      <Link to="/userlanding"> User </Link> <br></br>
      <Link to="/journals"> Journal </Link> <br></br>
      <Link to="/itinerary "> Itinerary </Link> <br></br>
      <Link to="/locations "> Destinations Map </Link> <br></br>
      <Link to="/trips"> Trip Form</Link> <br></br>
      <Link to="/login"> Login </Link> <br></br>
      <Link to="/about"> About </Link>
    </div>
  );
}


