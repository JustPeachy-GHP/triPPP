import { Link } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";
import RegistrationModal from "../Auth/RegistrationModal";
import TripformModal from "../Trip/TripForm/TripformModal";
// import LandingPageModal from "../User/UserlandingModal";
import JournalModal from "../Journal/JournalModal";

export default function Navbar() {
  console.log("hi,this is from Navbar");

  

  return (
    <div className="navBar" id="navbar">
      <Link to="/">Home </Link>  <br></br>
      <Link to="/tripform"> Make A Trip</Link> <br></br> 
      <Link to="/userlanding"> My Trips </Link> <br></br>  
      <Link to="/journals"> Journal </Link> <br></br> 
      <Link to="/login"> Login </Link> <br></br>  
      {/* <Link to="/about"> About </Link> */}
      

      
      <LoginModal/>
      <RegistrationModal/>
      <TripformModal/>
      <JournalModal/>
      {/* <LandingPageModal/> */}

    </div>
    
  );
}

