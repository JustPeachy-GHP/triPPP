// import { useState, useEffect } from "react";
// import { fetchSingleTrip } from "../../../helpers/tripAdminPage";

// export default function SingleTrip({ trip_id }) {
//   const [oneTrip, setoneTrip] = useState([]);

// useEffect(() => {
//   async function getSingleTrip() {
//     // hardcoded in trip_id of 1
//     const response = await fetchSingleTrip();
//     console.log("One trip to rule them all!", response);
//     setoneTrip(response);
//   }
//   getSingleTrip();
// }, []);
//   return (
//     <div id="trip-view">
//       <h1> {oneTrip.name}</h1>
//       {/* stretch- add location */}
//     </div>
//   );
// }

// NOTES
// can't see any trips, even when hardcoding in a trip id of 1
// Stephanie wants to pass props from userlanding page to here to get the trip_id
