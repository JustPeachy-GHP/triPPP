// import { groupmembs, groups, journals, trips, users } from '../../server/db/seedData';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Features/Display/Navbar';
import Muidrawer from './Features/Display/Muidrawer';
import Navtitle from './Features/Display/Navtitle';
// import Navtitle from './Features/Display/Navtitle';
// import AllJournalEntries from '../Features/Journal';
import Test from './Features/Test/Test';
import DisplayTest from './Features/Test/DisplayTest';
import Login from './Features/Auth/Login'
import Registration from './Features/Auth/Registration'
import UserLanding from './Features/User/UserLanding'


function App() {

  return (
    <>
  <Navtitle/> 
   <br/>
   <br/>
<h1>triPPP - this line is moves when changing browser size</h1>
    <Routes>
    <Route path="/test" element={<Test/>}/>
    <Route path="/displaytest" element={<DisplayTest/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Registration/>}/>
    <Route path="/userlanding" element={<UserLanding/>}/>
    {/* <Route path="/register" element={<Registration/>}/> */}
    {/* <Route path="/display" element={<Display/>}/>
    <Route path="/itinerary" element={<Itinerary/>}/>
    <Route path="/trips" element={<Trip/>}/> */}
    {/* <Route path="/journals" element={<AllJournalEntries/>}/> */}
    </Routes>
    </>
  )
}

export default App


//need to import the compenets for all these navagation - need the component files name for the nav to work
//All those up there is like a placeholder

  // <Muidrawer>
  //   <Navbar/>
  // </Muidrawer>
