import ItineraryInfoWindow from "./ItineraryInfoWindow";
import MemoizedItineraryMap from "./ItineraryMap";
import { useParams } from "react-router-dom";
import ItineraryView from "./ModalItinerary";

export default function ItineraryPage() {
    const params = useParams();
    console.log(params);

    return(
        <> 
            <div>
            </div>
            <div className="fixed-component">
                <MemoizedItineraryMap props={params.place_id}/>
            </div>
            <div className="scrollable-content"> 
                <ItineraryView />
                <ItineraryInfoWindow params={params.trip_id}/> 
            </div>
        </>
    );
}