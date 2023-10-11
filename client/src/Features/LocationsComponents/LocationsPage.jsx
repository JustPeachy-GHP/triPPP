import  MemoizedLocationsMap  from "./LocationsMap";
import  LocationsInfoWindow  from "./LocationsInfoWindow";
import { useParams } from 'react-router-dom';


export default function LocationsPage() {
    const params = useParams();
    
    return(
        <>
        <div className="fixed-component">
            <MemoizedLocationsMap/>
        </div>
        <div className="scrollable-content"> 
            <LocationsInfoWindow params={params.trip_id}/> 
        </div>
        </>
    );
}