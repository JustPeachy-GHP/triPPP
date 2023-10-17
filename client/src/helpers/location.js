const baseUrl = "https://peachypits.onrender.com/api/locations"

//not tested
export async function getDestByVibe (vibe) {
    try {
        const response = await fetch (`${baseUrl}/vibe/${vibe}`)
        const returnVal = response.json()
        return returnVal
    } catch (error) {
        return error
    }
}

export async function getDestRatings(possibleDestObj) {
    try {
      console.log("destination object", possibleDestObj)
      const trip_id = possibleDestObj.trip_id
      const location_id = possibleDestObj.location_id
      const response = await fetch(
        `${baseUrl}/destratings/${trip_id}/${location_id}`
      );
      const returnVal = response.json();
      return returnVal;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function getDestName(location_id) {
    try {
      const response = await fetch(
        `${baseUrl}/destname/${location_id}`
      );
      const returnVal = response.json();
      return returnVal;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function reviseDestRating(destinationObject) {
    try {
      const itinerary_id = destinationObject.itinerary_id
      const response = await fetch(`${baseUrl}/revisedrating/${itinerary_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(destinationObject),
      });
      const returnVal = response.json();
      return returnVal;
    } catch (error) {
      console.log(error)
      return error
    }
  }

  export async function addNewDestRating(destinationObject) {
    try {
      const response = await fetch(`${baseUrl}/newrating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(destinationObject),
      });
      const returnVal = response.json();
      return returnVal;
    } catch (error) {
      console.log(error)
      return error
    }
  }
