
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
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
import TripForm from "./Features/Trip/TripForm";
import Itinerary from "./Features/Itinerary/ItineraryView";
import LandingPage from "./Features/Display/LandingPage";
import TripForm from "./Features/Trip/TripForm/TripForm";
import LocationsPage from "./Features/LocationsComponents/LocationsPage";
import TripAdminPage from "./Features/Trip/TripAdmin/TripAdminPage";
import ItineraryPage from "./Features/Itinerary/ItineraryPage";
import AllJournalEntries from "./Features/Journal/AllJournalEntries";
import SingleJournalEntry from "./Features/Journal/SingleJournalEntry";
import CreateJournalForm from "./Features/Journal/CreateJournalForm";
import EditJournalForm from "./Features/Journal/EditJournalForm";
import JournalsByTrip from "./Features/Journal/JournalsByTrip";


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("JWToken");

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};


function App() {
  return (
    <>
      <ErrorBoundary>
        <GoogleMapsContextProvider>

          <Navtitle />
          <Routes>
            {/* Unprotected Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <LocationsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <Test />
                </ProtectedRoute>
              }
            />

            <Route
              path="/displaytest"
              element={
                <ProtectedRoute>
                  <DisplayTest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userlanding"
              element={
                <ProtectedRoute>
                  <UserLanding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trips"
              element={
                <ProtectedRoute>
                  <LandingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tripform"
              element={
                <ProtectedRoute>
                  <TripForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tripadminpage"
              element={
                <ProtectedRoute>
                  <TripAdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tripadminpage/1"
              element={
                <ProtectedRoute>
                  <TripAdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journals"
              element={
                <ProtectedRoute>
                  <AllJournalEntries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journalform"
              element={
                <ProtectedRoute>
                  <CreateJournalForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journals/:user_id/:trip_id"
              element={
                <ProtectedRoute>
                  <AllJournalEntries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journals/:journal_id"
              element={
                <ProtectedRoute>
                  <SingleJournalEntry />
                </ProtectedRoute>
              }
            />
            <Route
              path="/journals/:journal_id/edit"
              element={
                <ProtectedRoute>
                  <EditJournalForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/itinerary/:place_id"
              element={
                <ProtectedRoute>
                  <ItineraryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path=":trip_id/locations"
              element={
                <ProtectedRoute>
                  <LocationsPage />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LocationsPage />} />


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


            
            <Route path="/journals" element={<AllJournalEntries />} />
            <Route
              path="/journals/trip/:trip_id"
              element={<JournalsByTrip />}
            />
           
            <Route path="/journalform" element={<CreateJournalForm />} />
            <Route
              path="/journals/:journal_id/edit"
              element={<EditJournalForm />}
            />

            {/* <Route path="/register" element={<Registration/>}/> */}
            {/* <Route path="/display" element={<Display/>}/>
            {/* <Route path="/journals" element={<AllJournalEntries/>}/> */}

{/* //             <Route path="/journals/:journal_id/edit" element={<EditJournalForm />}/>
//             <Route path="/itinerary" element={<ItineraryPage />} />
//             <Route path="/locations" element={<LocationsPage />} /> */} 


          </Routes>
        </GoogleMapsContextProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;

