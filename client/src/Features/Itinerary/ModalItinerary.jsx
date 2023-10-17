import ItineraryItems from "./ItineraryItems";
import { useState, useEffect } from "react";
import { getItineraryByTrip } from "../../helpers/itinerary";
import { fetchSingleTrip } from "../../helpers/trips";
import { getDestName } from "../../helpers/location";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setMaps } from "../../slices/mapsSlice";
// import {} from '../../slices/authSlice';
import { setTrips } from "../../slices/tripsSlice";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "scroll",
  width: "75%",
  height: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// trip_id will be passed through from the click that
// gets you to the itinerary view page
// const trip_id = 7;

export default function ItineraryView() {
  // console.log(useSelector(state => state.maps.location_id))
  // console.log(useSelector(state => state.trips.trip_id))

  // const initialLocationId = useSelector(state => state.maps.location_id);
  // const initialTripId = useSelector(state => state.trips.trip_id)

  // const [locationId, setInitialLocationId] = useState(initialLocationId);
  // const [tripId, setInitialTripId] = useState(initialTripId);
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
  const handleClose = () => setOpen(false);
  const params = useParams();
  let content = "";

  const dispatch = useDispatch();
  const trip_id = params.trip_id;

  const handleOpen = () => {
    setOpen(true);
    makeDaysList();
  };

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
        console.log("getitinerarybytrip", response);
        setItems(response);

        // sortRatings()
      } catch (error) {
        console.log(error);
      }
    }
    console.log(trip_id);
    getTripInfo();
  }, [trip_id]);

  useEffect(() => {
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
      console.log("arraytosort", arraytosort);
      const sortedvotes = arraytosort.sort((a, b) => b[1] - a[1]);
      console.log("sortedvotes", sortedvotes);
      setFinalVotes(sortedvotes);
    }
    sortRatings();
  }, [items]);

  useEffect(() => {
    // get destination names for each location id and add
    // to each location's array
    async function getDestinationNames(finalVotes) {
      try {
        console.log("finalvotes in getdestinationnames", finalVotes);
        const destinationNames = [];

        for (const entry of finalVotes) {
          const locId = entry[0];
          const response = await getDestName(locId);
          destinationNames.push(response[0]["destination"]);
        }

        console.log("destinationNames", destinationNames);
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
          locid: "",
          displayname: "Day " + i,
          rating: "",
          classtype: "daymarker",
        });
        itineraryArray.push({
          locid: "",
          displayname: "Breakfast",
          rating: "",
          classtype: "meal",
        });
        for (let x = 1; x <= numActMorn; x++) {
          if (arrayCount < finalVotes.length) {
            itineraryArray.push({
              locid: finalVotes[arrayCount][0],
              displayname: destNames[arrayCount],
              rating: finalVotes[arrayCount][1],
              classtype: "place",
            });
          } else {
            itineraryArray.push({
              locid: "",
              displayname: "Free Time",
              rating: "",
              classtype: "freetime",
            });
          }
          arrayCount++;
        }
        itineraryArray.push({
          locid: "",
          displayname: "Lunch",
          rating: "",
          classtype: "meal",
        });
        for (let y = 1; y <= numActAft; y++) {
          if (arrayCount < finalVotes.length) {
            itineraryArray.push({
              locid: finalVotes[arrayCount][0],
              displayname: destNames[arrayCount],
              rating: finalVotes[arrayCount][1],
              classtype: "place",
            });
          } else {
            itineraryArray.push({
              locid: "",
              displayname: "Free Time",
              rating: "",
              classtype: "freetime",
            });
          }
          arrayCount++;
        }
        itineraryArray.push({
          locid: "",
          displayname: "Dinner",
          rating: "",
          classtype: "meal",
        });
      }
      setDayPlanArray(itineraryArray);
      console.log("itineraryArray", itineraryArray);
    }
    makeDaysList();
  }, [destNames]);

  return (
    <div>
      <Button className="viewItinerary" onClick={handleOpen}>
        View Itinerary
      </Button>
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
