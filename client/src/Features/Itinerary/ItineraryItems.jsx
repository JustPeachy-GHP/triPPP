export default function ItineraryItems({ locid, index, destination, rating }) {
  return (
    // make switch for B/L/D/Separator & itinerary items
 <span >
    <div locid={locid} className="itinerary-item" draggable>
      <h2>{destination}</h2>
      <p>Average vote: {rating}</p>
    </div>
  </span>
   
  );
}
