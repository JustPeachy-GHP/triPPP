import React, { useState } from "react";
import LandingPage from "./LandingPage";
import TripAdminPage from "./TripAdminPage";
import TripForm from "./TripForm";
// import VibeCheck from "./VibeCheck";
import Login from "../Auth/Login";

export default function Form() {
  const [tripname, setTripName] = useState("");
  const [formData, setFormData] = useState();

  const PageDisplay = () => {
    if (page === 0) {
      return <LandingPage />;
    } else if (page === 1) {
      return <TripForm formData={formData} setFormData={setFormData} />;
    } else {
      return <VibeCheck formData={formData} setFormData={setFormData} />;
    }
  };
  return (
    <div>
      <LandingPage setTripName={setTripName} />
      <TripForm setTripName={setTripName} />
      <VibeCheck setTripName={setTripName} />
      {/* <Login setTripName={setTripName} /> */}
      {/* <TripAdminPage setTripName={setTripName} /> */}
    </div>
  );
}
//
// form component- store data in this component to be passed out
