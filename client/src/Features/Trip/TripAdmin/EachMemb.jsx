import { deleteGroupMember } from "../../../helpers/tripAdminPage";
export default function EachMemb({
  email,
  firstname,
  lastname,
  trip_id,
  user_id,
}) {
  async function handleDelete(trip_id, user_id) {
    try {
      const response = await deleteGroupMember(trip_id, user_id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>{firstname}</h2>
      <h2>{lastname}</h2>
      <h2>{email}</h2>
      <button
        type="button"
        onClick={() => handleDelete(trip_id, user_id)}
      ></button>

      {/* map over group members to display members and to add delete button to each */}
      {/* need delete group memb button to display next to each group memb */}
    </div>
  );
}

// need - trip name, map over the members

// take in email
// convert email to user_id
// groupmemb change the trip_id to match the trip we're on
