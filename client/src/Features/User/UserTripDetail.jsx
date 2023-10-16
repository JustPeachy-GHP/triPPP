import { useNavigate } from "react-router-dom";

export default function UserTrips({ trip_id, location_id, tripname }) {
  console.log("trip_id", trip_id);
  console.log("location_id", location_id);

  const navigate = useNavigate();

  return (
    <>
      <div>
        {/* use onClick to navigate to a new page/view or open trip admin as a modal over the current page */}
        <button
          className="textButtons"
          onClick={() => navigate(`/tripadminpage/${trip_id}`)}
        >
          {tripname}
        </button>
      </div>
    </>
  );
}
