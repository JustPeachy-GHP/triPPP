const BASE_URL = "http://localhost:8080/api/trips";

export async function createTrip(
  itinerary_id,
  location_id,
  tripname,
  numdays,
  numtravelers,
  vibeform
) {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // itinerary_id,
        // location_id,
        tripname,
        numdays,
        numtravelers,
        // vibeform,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log("Your trip was not made");
  }
}

// TRIP FORM
// createtrip

// =====TRIP ADMIN FORM
// delete trip
// delete groupmemb
// update trip
// get trip by id
