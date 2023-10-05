import ItineraryItems from "./ItineraryItems";
import { useState, useEffect } from "react";
import { getItineraryByTrip } from "../../helpers/itinerary";
import { fetchSingleTrip } from "../../helpers/trips";
import { getDestName } from "../../helpers/location";

// trip_id will be passed through from the click that
// gets you to the itinerary view page
const trip_id = 7;

// *** Mock data ***
// near line 160 (votes = items) should be commented out if you are using
// the votes array here on line 18;
// it should NOT be commented out if getting data from the database

// const votes = [
//   {
//     itinerary_id: 6,
//     trip_id: 1,
//     location_id: 1,
//     user_id: 1,
//     rating: 2,
//   },
//   {
//     itinerary_id: 7,
//     trip_id: 1,
//     location_id: 1,
//     user_id: 2,
//     rating: 2,
//   },
//   {
//     itinerary_id: 8,
//     trip_id: 1,
//     location_id: 1,
//     user_id: 3,
//     rating: 3,
//   },
//   {
//     itinerary_id: 9,
//     trip_id: 1,
//     location_id: 2,
//     user_id: 1,
//     rating: 3,
//   },
//   {
//     itinerary_id: 10,
//     trip_id: 1,
//     location_id: 2,
//     user_id: 2,
//     rating: 1,
//   },
//   {
//     itinerary_id: 11,
//     trip_id: 1,
//     location_id: 2,
//     user_id: 3,
//     rating: 1,
//   },
//   {
//     itinerary_id: 12,
//     trip_id: 1,
//     location_id: 3,
//     user_id: 1,
//     rating: 1,
//   },
//   {
//     itinerary_id: 13,
//     trip_id: 1,
//     location_id: 3,
//     user_id: 2,
//     rating: 1,
//   },
//   {
//     itinerary_id: 14,
//     trip_id: 1,
//     location_id: 3,
//     user_id: 3,
//     rating: 1,
//   },
//   {
//     itinerary_id: 15,
//     trip_id: 2,
//     location_id: 4,
//     user_id: 1,
//     rating: 2,
//   },
//   {
//     itinerary_id: 16,
//     trip_id: 2,
//     location_id: 4,
//     user_id: 2,
//     rating: 3,
//   },
//   {
//     itinerary_id: 17,
//     trip_id: 2,
//     location_id: 4,
//     user_id: 3,
//     rating: 3,
//   },
//   {
//     itinerary_id: 18,
//     trip_id: 2,
//     location_id: 5,
//     user_id: 1,
//     rating: 3,
//   },
//   {
//     itinerary_id: 19,
//     trip_id: 2,
//     location_id: 5,
//     user_id: 2,
//     rating: 3,
//   },
//   {
//     itinerary_id: 20,
//     trip_id: 2,
//     location_id: 5,
//     user_id: 3,
//     rating: 3,
//   },
// ];

export default function ItineraryView() {
  const [items, setItems] = useState([]);
  const [numdays, setNumDays] = useState(0);
  const [numTravelers, setNumTravelers] = useState(0);
  const [destLocation, setDestLocation] = useState("");
  const [tripname, setTripname] = useState("");
  const [finVotes, setFinVotes] = useState([]);
  const [destNames, setDestNames] = useState([]);

  let content = "";

  useEffect(() => {
    // Get additional trip info for the itinerary from the trip table
    async function getTripInfo() {
      try {
        const response = await fetchSingleTrip(trip_id);
        setNumTravelers(response.numtravelers);
        setNumDays(response.numdays);
        setDestLocation(response.location_id);
        setTripname(response.tripname);
      } catch (error) {
        console.log(error);
      }
    }
    getTripInfo();

    // Get all activities that have been voted on associated with the trip
    async function getItineraryItems() {
      try {
        const response = await getItineraryByTrip(trip_id);
        setItems(response);
      } catch (error) {
        console.log(error);
      }
    }
    getItineraryItems();
  }, []);

  // use to switch between mock data and database data
  const votes = items;

  // for each item retrieved by getItineraryItems check if the
  // location id and the rating have been added to the location
  // and add to location
  const location = {};
  votes.forEach((vote) => {
    const location_id = vote.location_id;
    const rating = vote.rating;

    // result is an object with unique key
    // corresponding to destination and the sum of the ratings
    if (!location[location_id]) {
      location[location_id] = rating;
    } else {
      location[location_id] += rating;
    }
  });

  // divide by number of travelers for average
  for (const location_id in location) {
    location[location_id] /= numTravelers;
  }

  // sort the objects in descending order by average
  const arraytosort = Object.entries(location);
  const finalvotes = arraytosort.sort((a, b) => b[1] - a[1]);

  const displayname = [];

  useEffect(() => {
    // get destination names for each location id and add
    // to each location's array
    async function getDestinationNames(finalvotes) {
      try {
        const promises = finalvotes.map(async (entry) => {
          const locId = entry[0];
          const response = await getDestName(locId);
          return response[0]["destination"];
        });
        const destinationNames = await Promise.all(promises);
        setDestNames(destinationNames);
      } catch (error) {
        console.log(error);
      }
    }
    getDestinationNames(finalvotes);
  }, [finalvotes]);

  return (
    <div>
      <h1>{tripname}</h1>
      <h2>Suggested Itinerary for {numdays} days</h2>
      {finalvotes.map((vote, index) => {
        return (
          <ItineraryItems
            key={index}
            locid={vote[0]}
            destination={destNames[index]}
            rating={vote[1]}
          />
        );
      })}
    </div>
  );
}
