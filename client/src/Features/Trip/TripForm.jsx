import React, { useState } from "react";
import { createTrip } from "../../helpers/trips";
import Form from "./Form";

export default function TripForm() {
  return (
    <div>
      <form>
        <input placeholder="Trip Name" />
        <input placeholder="Trip Name" />
        <input placeholder="Trip Name" />
      </form>
    </div>
  );
}

// how are we going to pass data up to form.jsx?
