import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navtitle from "./Features/Display/Navtitle";
import Test from "./Features/Test/Test";
import DisplayTest from "./Features/Test/DisplayTest";
import Login from "./Features/Auth/Login";
import Registration from "./Features/Auth/Registration";
import UserLanding from "./Features/User/UserLanding";
import ErrorBoundary from "./Features/Display/ErrorBoundary";
import { GoogleMapsContextProvider } from "./context/googleMapsContext";
import "./App.css";
// import MemoizedLocationsMap from './Features/LocationsComponents/LocationsMap';
// import Form from "./Features/Trip/Form";
import LandingPage from "./Features/Display/LandingPage";
import TripForm from "./Features/Trip/TripForm/TripForm";
// import Itinerary from "./Features/Itinerary/ItineraryView"
import LocationsPage from "./Features/LocationsComponents/LocationsPage";
import TripAdminPage from "./Features/Trip/TripAdmin/TripAdminPage";
import ItineraryPage from "./Features/Itinerary/ItineraryPage";
import AllJournalEntries from "./Features/Journal/AllJournalEntries";
import SingleJournalEntry from "./Features/Journal/SingleJournalEntry";
import CreateJournalForm from "./Features/Journal/CreateJournalForm";
import EditJournalForm from "./Features/Journal/EditJournalForm";

function App() {
  return (
    <>
      <ErrorBoundary>
        <GoogleMapsContextProvider>
       <Navtitle/> 
          <br/>
           <br/>
            <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/displaytest" element={<DisplayTest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/userlanding" element={<UserLanding />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/tripform" element={<TripForm />} />
            <Route path="/tripadminpage" element={<TripAdminPage />} />
            <Route path=":trip_id/locations/" element={<LocationsPage />} />
            <Route path="/itinerary/:place_id" element={<ItineraryPage/>}/>
            <Route path="/journals/:user_id/:trip_id" element={<AllJournalEntries />}/>
            <Route path="/journals/:journal_id" element={<SingleJournalEntry />}/>
            <Route path="/journalform" element={<CreateJournalForm />} />
            <Route path="/journals/:journal_id/edit" element={<EditJournalForm />} />

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

