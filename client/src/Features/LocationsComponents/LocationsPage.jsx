import  MemoizedLocationsMap  from "./LocationsMap";
import  LocationsInfoWindow  from "./LocationsInfoWindow";


export default function LocationsPage() {
    return(
        <>
        <div>
        <MemoizedLocationsMap/>
        </div>
        <div> 
        <LocationsInfoWindow/> 
        </div>
        </>
    );
}