import { useNavigate } from "react-router-dom";
import { deleteTrip } from "../../helpers/tripAdminPage";

export default function DeleteTripButton({ trip_id }) {
  const navigate = useNavigate();
  async function handleDelete() {
    try {
      const response = await deleteTrip(trip_id);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div>
        <button type="button" onClick={handleDelete}>
          Delete Trip
        </button>
      </div>
    </div>
  );
}

// i think it's not deleting because there's nowhere that the id is coming from but need to check
