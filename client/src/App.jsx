// import { groupmembs, groups, journals, trips, users } from '../../server/db/seedData';

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Features/Display/Navbar";
import Muidrawer from "./Features/Display/Muidrawer";
// import AllJournalEntries from '../Features/Journal';
import Test from "./Features/Test/Test";
import DisplayTest from "./Features/Test/DisplayTest";
import Login from "./Features/Auth/Login";
import Registration from "./Features/Auth/Registration";
import UserLanding from "./Features/User/UserLanding";
// import LocationsInfoWindow from './Features/LocationsComponents/LocationsInfoWindow';
import ErrorBoundary from "./Features/Display/ErrorBoundary";
import { GoogleMapsContextProvider } from "./context/googleMapsContext";
import "./App.css";
// import MemoizedLocationsMap from './Features/LocationsComponents/LocationsMap';
// import Form from "./Features/Trip/Form";
import LandingPage from "./Features/Trip/LandingPage";
import TripForm from "./Features/Trip/TripForm";
import Itinerary from "./Features/Itinerary/ItineraryView"
import LocationsPage from "./Features/LocationsComponents/LocationsPage";
import TripAdminPage from "./Features/Trip/TripAdminPage";
function App() {
  return (
    <>
      <ErrorBoundary>
        <GoogleMapsContextProvider>
          <Muidrawer>
            <Navbar />
          </Muidrawer>
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/displaytest" element={<DisplayTest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/userlanding" element={<UserLanding />} />
            <Route path="/trips" element={<LandingPage />} />
            <Route path="/tripform" element={<TripForm />} />
            <Route path="/tripadminpage" element={<TripAdminPage />} />
            <Route path="/itinerary" element={<Itinerary/>}/>
            {/* <Route path="/register" element={<Registration/>}/> */}
            {/* <Route path="/display" element={<Display/>}/>
            {/* <Route path="/journals" element={<AllJournalEntries/>}/> */}
          </Routes>
        </GoogleMapsContextProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;

//need to import the compenets for all these navagation - need the component files name for the nav to work
//All those up there is like a placeholder
