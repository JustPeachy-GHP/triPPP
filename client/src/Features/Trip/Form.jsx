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

// if the user isn't logged in, direct them to the log in page

// if the user is logged in, direct them to our trip form

// with the user_id associted with the user, connect that to the trip you make

if (user_id) {
  // navigate to tripform
  useNavigate();
} else {
  // navigate to login
  useNavigate();
}
