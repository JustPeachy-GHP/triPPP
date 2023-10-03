// need to make helper, api, db query for:
// - checkRatings get existing votes where we match on trip_id and location_id
// - addNewItinRating
// - changeRating

const baseUrl = "http://localhost:8080/api/itineraryitems";

export async function checkRatings(checkItinObject) {
  try {
    const trip_id = checkItinObject.trip_id
    const location_id = checkItinObject.location_id
    const response = await fetch(
      `${baseUrl}/checkratings/${trip_id}/${location_id}`
    );
    const returnVal = response.json();
    return returnVal;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addNewItinRating(itineraryObject) {
  try {
    const response = await fetch(`${baseUrl}/newrating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryObject),
    });
    const returnVal = response.json();
    return returnVal;
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function reviseIRating(itineraryObject) {
  try {
    const itinerary_id = itineraryObject.itinerary_id
    const response = await fetch(`${baseUrl}/reviseirating/${itinerary_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryObject),
    });
    const returnVal = response.json();
    return returnVal;
  } catch (error) {
    console.log(error)
    return error
  }
}

