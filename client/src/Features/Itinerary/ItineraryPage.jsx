import ItineraryInfoWindow from "./ItineraryInfoWindow";
import MemoizedDestinationsMap from "./ItineraryMap";
import { useLocation } from "react-router-dom";

export default function ItineraryPage() {
    const location = useLocation();
    const destination = location.state;


    return(
        <> 
            <div className="fixed-component">
                <MemoizedDestinationsMap props={destination}/>
            </div>
            <div className="scrollable-content"> 
                <ItineraryInfoWindow props={destination}/> 
            </div>
        </>
    );
}