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
    </div>
  );
}
