import { deleteGroupMember } from "../../../helpers/tripAdminPage";

export default function EachMemb({
                                  email,
                                  firstname,
                                  lastname,
                                  trip_id,
                                  user_id,
                                  groupState,
                                  setGroupState
                                  }) 
{
  async function handleDelete(trip_id, user_id) {
    try {
      const response = await deleteGroupMember(trip_id, user_id);
      setGroupState(!groupState)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div>
        <h2>
          {firstname + " "} {lastname}
        </h2>
        <h3>{email}</h3>
        <button style={{}} onClick={() => handleDelete(trip_id, user_id)}>
          Delete Traveler
        </button>

        {/* map over group members to display members and to add delete button to each */}
        {/* need delete group memb button to display next to each group memb */}
      </div>
        {/* map over group members to display members and to add delete button to each */}
        {/* need delete group memb button to display next to each group memb */}
      </div>
    </div>
  );
}

// need - trip name, map over the members

// take in email
// convert email to user_id
// groupmemb change the trip_id to match the trip we're on
