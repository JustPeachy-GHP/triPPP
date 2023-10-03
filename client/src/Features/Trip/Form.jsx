import React, { useState } from "react";
import LandingPage from "./LandingPage";
import TripAdminPage from "./TripAdminPage";
import VibeCheck from "./VibeCheck";

import { createTrip } from "../../helpers/trips";
import TripForm from "./TripForm";

export default function Form() {
  const [tripname, setTripName] = useState("");
  const [filledForm, setFilledForm] = useState(true);

  return <div>{filledForm ? <VibeCheck /> : <TripForm />}</div>;
}

// tripform data + vibecheck data => form.js => helpers => database
