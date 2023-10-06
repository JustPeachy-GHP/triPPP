import ItineraryInfoWindow from "./ItineraryInfoWindow";
import MemoizedDestinationsMap from "./ItineraryMap";


export default function ItineraryPage() {
    return(
        <>
        <div className="fixed-component">
        <MemoizedDestinationsMap/>
        </div>
        <div className="scrollable-content"> 
        <ItineraryInfoWindow/> 
        </div>
        </>
    );
}