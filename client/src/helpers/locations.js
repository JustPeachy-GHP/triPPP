const BASE_URL = "http://localhost:8081/api/locations";

// GET all locations data
export async function fetchAllLocations() {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return []; // Return an empty array or handle the error appropriately
  }

}


  // GET all itinerary locations data
export async function fetchItineraryLocations(id) {
    try {
      const url = `${BASE_URL}/itinerary/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
      const items = await response.json();
      return items;
    } catch (error) {
      console.error("Error fetching locations:", error);
      return []; // Return an empty array or handle the error appropriately
    }
  }
  


// GET all coord
export async function fetchCoord(coord) {
  try {
    const response = await fetch(`${BASE_URL}/${coord}`);
    if (response.status === 204) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}

// GET place_id
export async function fetchPlaceId(place_id) {
  try {
    const response = await fetch(`${BASE_URL}/${place_id}`);
    if (response.status === 204) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}
