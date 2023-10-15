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
          ? ( <button className="textButtons" onClick={() => navigate(`/trips/${trip_id}`)}>
            {tripname}<p>load itinerary map</p> 
            </button>)
          :    
            // if isdecided is false direct user to set destination if admin, or wait on admin
            (( myId === myTrip.admin_id)
            ? (<button className="textButtons" onClick={() => alert(`this is where we redirect to destination map`)}>
            {tripname}<p>direct user back to administrator</p>
            </button>)
            :
            (<button className="textButtons" onClick={() => alert(`Waiting for ${myTrip.admin_name} at ${myTrip.admin_email} to set the destination...`)}>
              {tripname}<p>direct user back to administrator</p>
              </button>)
            )
          }
          </div>
      </div>
    </>
  );
}
