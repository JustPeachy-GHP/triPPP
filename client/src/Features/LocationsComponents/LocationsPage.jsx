import  MemoizedLocationsMap  from "./LocationsMap";
import  LocationsInfoWindow  from "./LocationsInfoWindow";


export default function LocationsPage() {
    return(
        <>
        <div className="fixed-component">
        <MemoizedLocationsMap/>
        </div>
        <div className="scrollable-content"> 
        <LocationsInfoWindow/> 
        </div>
        </>
    );
}