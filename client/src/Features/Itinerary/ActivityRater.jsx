// pass { trip_id, location_id, numtravelers } in as props
import { useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box } from "@mui/material";
import { addNewItinRating, reviseIRating } from "../../helpers/itinerary";
import { useSelector } from 'react-redux';
import { fetchPlaceId } from "../../helpers/locations";

export default function Rater(props) {
  const [itineraryId, setItineraryId] = useState(0);
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [avg, setAvg] = useState(0);
  const [limitLow, setLimitLow] = useState(0);
  const [limitHigh, setLimitHigh] = useState(0);
  const [rated, setRated] = useState(false);
  const auth = useSelector((state) => state.auth);
  const params = useParams();


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
    console.log("VOTED");
    console.log("User: ", auth.user_id);
    console.log("PLACE: ", props.place_id);
    let location;
    
    

    try {
      location = await fetchPlaceId(props.place_id);
      console.log(location);
    } catch (error) {
      console.error(error);
    }

    let itineraryObject = {
      trip_id: params.trip_id,
      location_id: location.location_id,
      user_id: auth.user_id,
      rating: newValue,
    };

    if (rated) {
      try {
        itineraryObject = {itinerary_id: itineraryId, ...itineraryObject };
        const rating = await reviseIRating(itineraryObject);
        console.log(rating);
      } catch (error) {
        console.errof(error);
      }
    } else {
      try {
        const rating = await addNewItinRating(itineraryObject);
        console.log(rating);
        setRated(true);
        setItineraryId(rating.itinerary_id);
      } catch (error) {
        console.error(error);
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
            <p>Vote on this Activity:</p>
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
          <p>{value}</p>
        </div>
      </div>
    </>
  );
}
