import { addGroupMember } from "../../helpers/tripAdminPage";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddGroupMemb({ trip_id, user_id }) {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const APIData = await addGroupMember(username);
      console.log("API Data", APIData);
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h2> Add Traveler </h2>
        <input
          className="inputField"
          id="username"
          value={username}
          type="text"
          name="username"
          placeholder="email"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </label>
      <button> Submit</button>
    </form>
  );
}
