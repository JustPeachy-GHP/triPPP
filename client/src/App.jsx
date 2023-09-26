// import { groupmembs, groups, journals, trips, users } from '../../server/db/seedData';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from '../Features/Display/Navbar';
import Muidrawer from '../Features/Display/Muidrawer';
// import AllJournalEntries from '../Features/Journal';


function App() {

  return (
    <>

  <Muidrawer>
      <Navbar/>
  </Muidrawer>
   

    <Routes>
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
