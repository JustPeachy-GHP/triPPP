const BASE_URL = "http://localhost:8080/api/trips";

export async function createTrip(tripobj) {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripobj),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log("Your trip was not made");
    throw error;
  }
}

// =====TRIP ADMIN FORM
// delete trip

// delete groupmemb
// update trip
// get trip by id and members for that trip
