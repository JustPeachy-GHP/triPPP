import { Link } from "react-router-dom";

export default function Navbar() {
  console.log("hi");

  return (

    <div 
    className="Navbar"
    id="navbar">
      <Link to="/">Home </Link>  <br></br>
      <Link to="/destination"> Map </Link>  <br></br>
      <Link to="/locations"> Location </Link> <br></br>

    
      <Link to="/display"> Map </Link> <br></br>

      <Link to="/journal"> Journal </Link> <br></br>
      <Link to="/itinerary "> Itinerary </Link> <br></br>

      <Link to="/trips"> Trip </Link> <br></br>
      <Link to="/login"> Login </Link> <br></br>
      <Link to="/about"> About </Link>
    </div>
  );
}


//what is needed to be shown
//would need a home page, see users?, see group(yourself)
