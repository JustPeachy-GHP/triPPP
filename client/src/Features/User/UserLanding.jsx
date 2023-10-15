import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getMyGroupAdmin,
  getMyMembGroups,
  getMyJEntries,
} from "../../helpers/userLanding";
import UserTrips from "./UserTripDetail";
import UserTripMember from "./UserTripMember";
import { useNavigate } from "react-router-dom";

export default function UserLanding() {
  const [tripsMemb, setTripsMemb] = useState([]);
  const [tripAdmins, setTripAdmins] = useState([]);
  const [journals, setJournals] = useState([]);
  const [newUser, setNewUser] = useState([false]);

  const myId = useSelector((state) => state.auth.user_id);
  const myname = useSelector((state) => state.auth.firstname);

  const navigate = useNavigate();

  //get list of trips user is organizing
  useEffect(() => {
    async function getMyData() {
      const adminOfGroups = await getMyGroupAdmin(myId);
      setTripAdmins(adminOfGroups);

      const membOfGroups = await getMyMembGroups(myId);
      console.log("Member of: ", membOfGroups);
      setTripsMemb(membOfGroups);

      const journalEntries = await getMyJEntries(myId);
      setJournals(journalEntries);

      if (adminOfGroups.length === 0 && membOfGroups.length === 0) {
        setNewUser(true);
      } else {
        setNewUser(false);
      }
    } getMyData()
  }, []);

  return (
    <>
      <div>
        <div className="userlanding">

          { myname ? ( 
          <h1>Welcome, {myname}!</h1>
          ) : (
            <h1>Welcome!</h1>)
          }
          { newUser ? (
            <div>
              <h3>
                I think you're new here, would you like to start planning a
                trip?
              </h3>
            </div>
          ) : (
            <div>
              <h2>Trips</h2>
              <div>
                <h3>Trips you are organizing:</h3>
                {tripAdmins.map((admin) => (
                  <UserTrips key={admin.trip_id} trip_id={admin.trip_id} location_id={admin.location_id} tripname={admin.tripname} />
                ))}
              </div>
              <div>
                <h3>Trips you are joining:</h3>
                {tripsMemb.map((memb) => (  
                // eslint-disable-next-line react/jsx-key
                <div>
                  <UserTripMember key={memb.trip_id} trip_id={memb.trip_id} location_id={memb.location_id} tripname={memb.tripname} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="journalLink">
            <a href={"/journals"}>Journals</a>
          </div>
        </div>
      </div>
    </>
  );
}
