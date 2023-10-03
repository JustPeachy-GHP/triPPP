const BASE_URL = "http://localhost:8080/api/locations";

// GET all locations data
export async function fetchAllLocations() {
    console.log("Fetching locations");
    try {
        const response = await fetch(`${BASE_URL}/locations`);
        if (!response.ok) {
            throw new Error('API request failed with status: ${response.status}')
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log("No locations!", error);
        return error;
    }
}

// GET all coord
export async function fetchCoord(coord) {
    try {
        const response = await fetch(`${BASE_URL}/locations/${coord}`);
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
        const response = await fetch(`${BASE_URL}/locations/${place_id}`);
        if (response.status === 204) {
            const result = await response.json();
            return result;
        }
    } catch (error) {
        console.error(error);
    }
}

