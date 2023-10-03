const BASE_URL = "http://localhost:8080/api/trips";

// ==================Create trip======> tripfor.jsx
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
