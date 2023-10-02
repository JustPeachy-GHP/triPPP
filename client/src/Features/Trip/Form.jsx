import React, { useState } from "react";
import LandingPage from "./LandingPage";
import TripAdminPage from "./TripAdminPage";
// import VibeCheck from "./VibeCheck";
import { createTrip } from "../../helpers/trips";
import TripForm from "./TripForm";

export default function Form() {
  const [tripname, setTripName] = useState("");

  //   const PageDisplay = () => {
  //     if (page === 0) {
  //       return <LandingPage />;
  //       // } else if (page === 1) {
  //       //   return <TripForm tripname={tripname} setTripName={setTripName} />;
  //       // } else {
  //       //   return <VibeCheck tripname={tripname} setTripName={setTripName} />;
  //       // }
  //     }
  //   };
  return (
    <div>
      <LandingPage />
      {/* <TripForm setTripName={setTripName} /> */}
      {/* // <VibeCheck setTripName={setTripName} /> */}
      {/* <Login setTripName={setTripName} /> */}
      {/* <TripAdminPage setTripName={setTripName} /> */}
    </div>
  );
}
