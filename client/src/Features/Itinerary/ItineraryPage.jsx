import ItineraryInfoWindow from "./ItineraryInfoWindow";
import MemoizedItineraryMap from "./ItineraryMap";
import { useParams } from "react-router-dom";

export default function ItineraryPage() {
    const params = useParams();

    return(
        <> 
            <div className="fixed-component">
                <MemoizedItineraryMap props={params.place_id}/>
            </div>
            <div className="scrollable-content"> 
                <ItineraryInfoWindow /> 
            </div>
        </>
    );
}