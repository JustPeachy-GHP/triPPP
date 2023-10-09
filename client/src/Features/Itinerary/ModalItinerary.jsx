import ItineraryItems from "./ItineraryItems";
import { useState, useEffect } from "react";
import { getItineraryByTrip } from "../../helpers/itinerary";
import { fetchSingleTrip } from "../../helpers/trips";
import { getDestName } from "../../helpers/location";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'scroll',
  width: '75%',
  height: '75%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
  const [numDays, setNumDays] = useState(0);
  const [numTravelers, setNumTravelers] = useState(0);
  const [destLocation, setDestLocation] = useState("");
  const [tripname, setTripname] = useState("");
  const [finVotes, setFinVotes] = useState([]);
  const [destNames, setDestNames] = useState([]);
  const [dayPlanArray, setDayPlanArray] = useState([]);
  const [finalVotes, setFinalVotes] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let content = "";

  useEffect(() => {
    // Get additional trip info for the itinerary from the trip table
    async function getTripInfo() {
      try {
        let response = await fetchSingleTrip(trip_id);
        setNumTravelers(response.numtravelers);
        setNumDays(response.numdays);
        setDestLocation(response.location_id);
        setTripname(response.tripname);

        response = await getItineraryByTrip(trip_id);
        console.log("getitinerarybytrip", response)
        setItems(response);

        // sortRatings()

      } catch (error) {
        console.log(error);
      }
    }
    getTripInfo();
  }, []);

  useEffect (() => {
    function sortRatings() {
      // use to switch between mock data and database data
      console.log("items", items);
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
      console.log("arraytosort", arraytosort)
      const sortedvotes = arraytosort.sort((a, b) => b[1] - a[1]);
      console.log("sortedvotes", sortedvotes)
      setFinalVotes(sortedvotes)
    }
    sortRatings()
  },[items])

  useEffect(() => {
    // get destination names for each location id and add
    // to each location's array
    async function getDestinationNames(finalVotes) {
      try {
        console.log("finalvotes in getdestinationnames", finalVotes)
        const destinationNames = []

        for (const entry of finalVotes) {
          const locId = entry[0];
          const response = await getDestName(locId);
          destinationNames.push(response[0]["destination"])
        }

        console.log("destinationNames", destinationNames)
        setDestNames(destinationNames);
      } catch (error) {
        console.log(error);
      }
    }
    getDestinationNames(finalVotes);
    console.log(finalVotes);
  }, [finalVotes]);

  useEffect(() => {
    function makeDaysList() {
      const itineraryArray = [];
      let arrayCount = 0;

      // number of activities in the morning and afternoon
      const numActMorn = 1; // for simplicity, leaving set to 1
      const numActAft = 1; // for simplicity, leaving set to 1

      for (let i = 1; i <= numDays; i++) {
        // for each day:
        itineraryArray.push({
            locid:"",
            displayname: "Day " + i,
            rating: "",
            classtype: "daymarker"
          });
        itineraryArray.push({
          locid: "",
          displayname: "Breakfast",
          rating: "",
          classtype: "meal"
        });
        for (let x = 1; x <= numActMorn; x++) {
          if (arrayCount < finalVotes.length) {
            itineraryArray.push({
              locid: finalVotes[arrayCount][0],
              displayname: destNames[arrayCount],
              rating: finalVotes[arrayCount][1],
              classtype: "place"
            });
          } else {
            itineraryArray.push({
              locid: "",
              displayname: "Free Time",
              rating: "",
              classtype: "freetime"
            });
          }
          arrayCount++;
        }
        itineraryArray.push({
          locid: "",
          displayname: "Lunch",
          rating: "",
          classtype: "meal"
        });
        for (let y = 1; y <= numActAft; y++) {
          if (arrayCount < finalVotes.length) {
            itineraryArray.push({
              locid: finalVotes[arrayCount][0],
              displayname: destNames[arrayCount],
              rating: finalVotes[arrayCount][1],
              classtype: "place"
            });             
          } else {
            itineraryArray.push({
              locid: "",
              displayname: "Free Time",
              rating: "",
              classtype: "freetime"
            });
          }
          arrayCount++;
        }
        itineraryArray.push({
          locid: "",
          displayname: "Dinner",
          rating: "",
          classtype: "meal"
        });
      }
      setDayPlanArray(itineraryArray);
      console.log("itineraryArray", itineraryArray);
    }
    makeDaysList();
  }, [destNames]);

  console.log("dayPlanArray", dayPlanArray)

  return (
    <div>
      <Button onClick={handleOpen}>View Itinerary</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
      <div className="modaltitle">
      <h1>{tripname}</h1>
      <h2>Suggested Itinerary for {numDays} days</h2>
      </div>
      {dayPlanArray.map((item, index) => {
        return (
          <ItineraryItems
            key={index}
            locid={item.locid}
            displayname={item.displayname}
            rating={item.rating}
            classtype={item.classtype}
          />
        );
      })}
      </Box>
      </Modal>
    </div>
  );
}
