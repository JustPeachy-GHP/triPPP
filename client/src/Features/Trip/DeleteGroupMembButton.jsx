import { deleteGroupMember } from "../../helpers/tripAdminPage";
import { useNavigate } from "react-router";

export default function DeletetGroupMembButton(user_id) {
  const navigate = useNavigate();
  async function handleDelete() {
    try {
      const response = await deleteGroupMember(user_id);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div>
        <button type="button" onClick={handleDelete}>
          Delete Group Member
        </button>
      </div>
    </div>
  );
}

// not done, still need to figure out how to display for each of the members (which also hasn't been loaded, oops)
