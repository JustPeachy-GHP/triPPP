import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllMembersbyId } from "../../../helpers/tripAdminPage";
import DeleteGroupMembButton from "./DeleteGroupMembButton";

export default function AllGroupMembs() {
  const [allGMembs, setAllGMembs] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function membersingroup() {
      const response = await getAllMembersbyId(params.trip_id, params.user_id);
      console.log("All members showing", response);
      setAllGMembs(response);
    }
    membersingroup();
  }, []);

  return (
    <div key={allGMembs.trip_id}>
      <DeleteGroupMembButton />
      {/* need delete group memb button to display next to each group memb */}
    </div>
  );
}
