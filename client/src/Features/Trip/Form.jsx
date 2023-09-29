import React, { useState } from "react";
import LandingPage from "./LandingPage";
import TripAdminPage from "./TripAdminPage";
import VibeCheck from "./VibeCheck";
import { createTrip } from "../../helpers/trips";
import TripForm from "./TripForm";

export default function Form() {
  const [tripname, setTripName] = useState("");
  const [filledForm, setFilledForm] = useState(false);

  return (
    <div>
      {filledForm ? <VibeCheck /> : <TripForm />}
      {/* <TripForm setTripName={setTripName} /> */}
      {/* // <VibeCheck setTripName={setTripName} /> */}
      {/* <Login setTripName={setTripName} /> */}
      {/* <TripAdminPage setTripName={setTripName} /> */}
    </div>
  );
}
