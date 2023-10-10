import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  console.log("hi,this is from Navbar");

  const navigate=useNavigate()

  const isAuthenticated = localStorage.getItem("isAuthenticated")
  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="navBar" id="navbar">
      <Link to="/">Home </Link>  <br></br>
      <Link to="/tripform"> Make A Trip</Link> <br></br> 
      <Link to="/userlanding"> My Trips </Link> <br></br>  
      <Link to="/journals"> Journal </Link> <br></br>
      { isAuthenticated ?
       <button className="logoutButton" onClick={handleLogout}>Logout</button>
      : 
      <Link to="/login"> Login </Link>  }
       <br></br>
      {/* <Link to="/about"> About </Link> */}
    </div>
  );
}

