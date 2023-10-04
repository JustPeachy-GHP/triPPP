// import React, { useState, useEffect } from "react";
// import { deleteGroupMember } from "../../helpers/tripAdminPage";
// import { deleteTrip } from "../../helpers/tripAdminPage";
// import { updateTrip } from "../../helpers/tripAdminPage";
// import { addGroupMember } from "../../helpers/tripAdminPage";
// import { fetchSingleTrip } from "../../helpers/tripAdminPage";

// export default function TripAdminPage(trip_id, user_id) {
//   // hardcode in user profile
//   const user_id = 1
//   const [tripData, setTripData] = useState("");
//   const [email, setEmail] = useState("");
//   const [groupMembers, setGroupMembers] = useState("");

//   function handleTripData(trip_id, user_id) {
//     setTripData(!tripData);
//   }
//   // get trip
//   useEffect(() => {
//     async function getSingleTrip() {
//       const response = await fetchSingleTrip(trip_id);
//       console.log("loading trip", response);
//       setTripData(response);
//     }
//     // delete trip member
//     useEffect(() => {
//       async function deleteMember() {
//         const response = await deleteGroupMember(user_id, trip_id);
//         console.log("deleting trip", response);
//       }
//     });
//     function DeleteButton() {
//       const handleDelete = () => {
//         alert("Group Member Deleted");
//       };
//       function DeleteTrip() {
//         const handleDelete = () => {
//           alert("Trip Deleted");
//         };
//       }
//     }
//   });
//   return (
//     <div>
//       <h1> TripAdminPage</h1>
//       <h2> tripname</h2>
//       <form>
//         <label for="addTraveler">Add New Traveler:</label>
//         <input type="email" id="email" placeholder="Email" /> <br />
//         <button type="submit" value="submit" /> <br />
//         {/* display emails of trip members  */}
//         <br />
//         <DeleteButton onClick={handleDelete} />
//         <DeleteTrip onClick={handleTripDelete} />
//       </form>
//     </div>
//   );
// }

// // store new travelers
// // store trip
// //
