import { useNavigate } from "react-router-dom";
import TripAdminPage from "../Trip/TripAdmin/TripAdminPage";
import { Link } from "react-router-dom";

export default function UserTrips({ setTripId, group, trip_id, location_id }) {
  console.log("group", group);
  console.log("trip_id", trip_id);
  console.log("location_id", location_id);
  console.log(setTripId);
  const navigate = useNavigate();
  function tripIdHelper() {
    setTripId(trip_id);
  }
  tripIdHelper();
  return (
    <>
      <div>
        {/* <TripAdminPage trip_id={trip_id} /> */}
        {/* use onClick to navigate to a new page/view or open trip admin as a modal over the current page */}
        {/* <button
          className="textButtons"
          onClick={() => navigate(`/tripadminpage/${trip_id}`)}
        >
          {group.tripname}
        </button> */}
        <Link to={`/tripadminpage/${trip_id}`} state={{ trip_id }}>
          {group.tripname}
        </Link>
      </div>
    </>
  );
}
