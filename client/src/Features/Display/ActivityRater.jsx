// pass { trip_id, location_id, numtravelers } in as props
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box } from "@mui/material";
import {
  checkRatings,
  addNewItinRating,
  reviseIRating,
} from "../../helpers/itinerary";

// dummy data being used until we are loading component from the map
const trip_id = 4;
const location_id = 2;
const user_id = 1;
const numtravelers = 5;

// const mockVotes = [
//   {
//     trip_id: 3,
//     location_id: 1,
//     user_id: 1,
//     rating: 1,
//   },
//   {
//     trip_id: 3,
//     location_id: 1,
//     user_id: 4,
//     rating: 1,
//   },
//   {
//     trip_id: 3,
//     location_id: 1,
//     user_id: 3,
//     rating: 3,
//   },
//   {
//     trip_id: 3,
//     location_id: 1,
//     user_id: 2,
//     rating: 1,
//   },
//   {
//     trip_id: 3,
//     location_id: 1,
//     user_id: 5,
//     rating: 2,
//   },
// ];

// end dummy data

export default function Rater() {
  const [alreadyRated, setAlreadyRated] = useState(false);
  const [itinerary_id, setItineraryId] = useState("");
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [avg, setAvg] = useState(0);
  const [limitLow, setLimitLow] = useState(0);
  const [limitHigh, setLimitHigh] = useState(0);
  const [ratings, setRatings] = useState([]);

  let retrieved = [];

  useEffect(() => {
    async function getRatings() {
      let checkItinObject = {
        trip_id: trip_id,
        location_id: location_id,
        user_id: user_id,
      };
      try {
        const response = await checkRatings(checkItinObject);

        // console.log("Rater component", response);
        setRatings([...ratings, ...response]);
        retrieved = [...response];
      } catch (error) {
        console.log(error);
      }

      // retrieved.map((rated, index) => {
      //   console.log("top of getAvg rating", rated, "index", index);
      // });

      // console.log("types of", typeof retrieved[0].user_id, typeof user_id);

      const index = retrieved.findIndex((obj) => obj.user_id === user_id);
      // console.log("returned from findIndex", index);

      index !== -1 || null
        ? setAlreadyRated(true)
        : console.log("user_id", user_id, "not found");
      // console.log("already rated", alreadyRated);
      setItineraryId(retrieved[index].itinerary_id);
      // console.log("itinerary_id", retrieved[index].itinerary_id);
      setValue(retrieved[index].rating);
      // console.log("retrieved vote from db", retrieved[index].rating);
      let tempTotal = 0;

      let numVoters = retrieved.length;

      for (let i = 0; i < numVoters; i++) {
        // tempTotal = tempTotal + mockVotes[i].rating;
        tempTotal = tempTotal + retrieved[i].rating;
        // console.log("i", i, "tempTotal", tempTotal);
      }
      let calcAvg = tempTotal / numVoters;
      // console.log("calcAvg", calcAvg);
      setAvg(calcAvg);
      // console.log("average", avg);
      // reset tempTotal in case rerenders
      tempTotal = 0;

      //lower threshold: if 50% of the group votes 1 and everyone else 2
      //high threshold: if 50% of the group votes 3 and everyone else 2

      const gt50percent = Math.ceil(numVoters / 2);
      setLimitLow(
        (1 * gt50percent + 2 * (numVoters - gt50percent)) / numVoters
      );
      setLimitHigh(
        (3 * gt50percent + 2 * (numVoters - gt50percent)) / numVoters
      );

      // console.log("limit high", limitHigh);
      // console.log("limit low", limitLow);
    }
    getRatings();
  }, [value]);

  // function to calculate thresholds to show large heart color
  // mapped to popularity of itinerary activity based on votes

  let avgColor = "";

  switch (true) {
    case avg <= limitLow:
      avgColor = "#A3C3D9";
      break;
    case avg > limitLow && avg < limitHigh:
      avgColor = "#F49867";
      break;
    case avg >= limitHigh:
      avgColor = "#C33149";
      break;
  }

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  const labels = {
    1: "Meh.",
    2: "Could be fun?",
    3: "Let's do this!",
  };

  async function onVote(newValue) {
    // console.log("already rated?", alreadyRated);
    let itineraryObject = {
      trip_id: trip_id,
      location_id: location_id,
      user_id: user_id,
      rating: newValue,
    };
    if (alreadyRated === true) {
      try {
        // user's vote already exists, add itinerary_id to object
        itineraryObject.itinerary_id = itinerary_id;
        // console.log("added", itineraryObject.itinerary_id, itineraryObject);
        const response = await reviseIRating(itineraryObject);
        // console.log(response)
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // create new row in itineraryitems
        const response = await addNewItinRating(itineraryObject);
        setAlreadyRated(true);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      <div className="inforater">
        <div className="infovoter">
          <div className="currentvote">
            {avg === 0 ? (
              <FavoriteBorderIcon
                style={{ color: "#E0E0E0" }}
                fontSize="large"
              />
            ) : (
              <FavoriteIcon style={{ color: avgColor }} fontSize="large" />
            )}
          </div>
          <div>
            <h4>Contents of this box would come from Infowindow</h4>
          </div>
          <div className="hearts">
            <StyledRating
              max={3}
              size="small"
              name="set1"
              value={value}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
              onChange={(event, newValue) => {
                setValue(newValue);
                onVote(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
          </div>
          <div className="heartstext">
            {value !== null && (
              <Box>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </div>
          <p>{value} (displaying the value being set on click)</p>
        </div>
      </div>
    </>
  );
}
