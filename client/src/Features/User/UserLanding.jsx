import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getMyGroupAdmin,
  getMyMembGroups,
  getMyJEntries,
} from "../../helpers/userLanding";
import UserTrips from "./UserTripDetail";
import UserJEntry from "./UserJEntryDetail";
import { useNavigate } from "react-router-dom"

export default function UserLanding() {
  const [tripsMemb, setTripsMemb] = useState([]);
  const [tripAdmins, setTripAdmins] = useState([]);
  const [journals, setJournals] = useState([])
  const [newUser, setNewUser] = useState([false])

  const myId = useSelector((state) => state.auth.user_id);
  const myname = useSelector((state) => state.auth.firstname);

  const navigate = useNavigate()

  //get list of trips user is organizing
  useEffect(() => {
    async function getMyGroups(myId) {
      const adminOfGroups = await getMyGroupAdmin(myId);
      console.log("Admin: ", adminOfGroups);
      setTripAdmins(adminOfGroups);
    }
    getMyGroups(myId);
  }, []);

  // get list of trips user is joining
  useEffect(() => {
    async function getMyGroups(myId) {
      const membOfGroups = await getMyMembGroups(myId);
      console.log("Member of: ", membOfGroups);
      setTripsMemb(membOfGroups);
    }
    getMyGroups(myId);
  }, []);

  // get list of journals and save in journals array

  useEffect(() => {
    async function getMyJournals(myId) {
      const journalEntries = await getMyJEntries(myId);
      console.log("Journals: ", journalEntries);
      setJournals(journalEntries);
    }
    getMyJournals(myId);
  }, []);

  useEffect(() =>{
    if ( tripsMemb.length === 0 && 
      tripAdmins === 0 && 
      journals === 0) {
      setNewUser(true)
      console.log("newUser =", true)
    } else {
      console.log("existing user")
    }
  })

  return (
  <>
    <div> 
      <div className="userlanding">
        <h1>Welcome, {myname}!</h1>
        <h2>Trips</h2>
        <h3>Organizing:</h3>
        {tripAdmins.map((group) => {
          return <UserTrips group={group} trip_id={group.trip_id} location_id={group.location_id}/>;
        })}
        <h3>Joining:</h3>
        {tripsMemb.map((group) => {
          return <UserTrips group={group} trip_id={group.trip_id} location_id={group.location_id}/>;
        })}
        <div className="journalLink">
        <a href={"/journals"}>Journals</a>
        </div>
        {/* {journals.map((entry) => {
          return <UserJEntry entry={entry} />;
        })} */}
      </div> 
    </div>
  </>
  );
}
