import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getExtTripData } from "../../helpers/trips"

export default function UserTripMember({ trip_id, location_id, tripname }) {

  const [myTrip, setMyTrip] = useState([])

  const navigate = useNavigate();
  const myId = useSelector((state) => state.auth.user_id);
    
    // *** do query for admin/admin name,
    // isdecided in UserTripMember component!
    useEffect (()=>{ 
      async function getMyData() {
        const extData = await getExtTripData(trip_id)
        console.log("getting extended data", extData)
        setMyTrip(extData)
      } getMyData()
    },[])
    
  return (
    <>
      <div>
        {/* use onClick to navigate to a new page/view or open trip admin as a modal over the current page */}
        
          
          <div>
            {/* check if destination isdecided is true - if it is, direct to itinerary map */}
          { myTrip.isdecided === true 
          ? ( <button className="textButtons" onClick={() => navigate(`/trips/${myTrip.trip_id}`)}>
            {tripname}<p>Look at things we can do on this trip.</p> 
            </button>)
          :    
            // if isdecided is false direct user to set destination if admin, or wait on admin
            (( myId === myTrip.admin_id)
            ? (<button className="textButtons" onClick={() => navigate(`/trips/:${trip_id}/locations`, {replace: true})}>
            {tripname}<p>Let's set the destination for this trip!</p>
            </button>)
            :
            (<button className="textButtons" onClick={() => alert(`Waiting for ${myTrip.admin_name} at ${myTrip.admin_email} to set the destination...`)}>
              {tripname}<p>... Waiting for { myTrip.admin_name ? `${myTrip.admin_name} at ${myTrip.admin_email} `: `your trip organizer ` } to set the destination ...</p>
              </button>)
            )
          }
          </div>
      </div>
    </>
  );
}
