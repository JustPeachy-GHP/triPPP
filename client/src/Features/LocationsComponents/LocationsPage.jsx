import  MemoizedLocationsMap  from "./LocationsMap";
import  LocationsInfoWindow  from "./LocationsInfoWindow";
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function LocationsPage() {
    const params = useParams();
    console.log(params);
    
    const [locations, setLocations] = useState([]);
    console.log("page", locations)

    return(
        <>
        <div className="fixed-component">
            <MemoizedLocationsMap locations={locations} setLocations={setLocations}/>
        </div>
        <div className="scrollable-content"> 
            <LocationsInfoWindow params={params.trip_id} locations={locations} /> 
        </div>
        </>
    );
}