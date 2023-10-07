// import { groupmembs, groups, journals, trips, users } from '../../server/db/seedData';

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
import LandingPage from "./Features/Trip/LandingPage";
import TripForm from "./Features/Trip/TripForm";
import Itinerary from "./Features/Itinerary/ItineraryView";
import LocationsPage from "./Features/LocationsComponents/LocationsPage";
import TripAdminPage from "./Features/Trip/TripAdminPage";
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
          <Navtitle />

          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/displaytest" element={<DisplayTest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/userlanding" element={<UserLanding />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/tripform" element={<TripForm />} />
            <Route path="/tripadminpage" element={<TripAdminPage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/journals/:user_id/:trip_id" element={<AllJournalEntries />}/>
            <Route path="/journals/:journal_id" element={<SingleJournalEntry />}/>
            <Route path="/journalform" element={<CreateJournalForm />} />
            <Route path="/journals/:journal_id/edit" element={<EditJournalForm />}/>
            <Route path="/register" element={<Registration />} />
            <Route path="/journals" element={<AllJournalEntries />} />
          </Routes>
        </GoogleMapsContextProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;

//need to import the compenets for all these navagation - need the component files name for the nav to work
//All those up there is like a placeholder
