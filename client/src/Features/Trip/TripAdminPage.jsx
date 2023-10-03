
export default function TripAdminPage() {
  return (
    <div>
      <h1>TripAdminPage</h1>
      <form>
        <label htmlFor="tripname">Trip Name:</label><br/>
        <input type="text" id="tripname" name="tripname" /><br />
        
        <label htmlFor="addtraveler">Add Traveler:</label><br/>
        <input type="email" id="addtraveler" name="addtraveler" /><br />
        
        {/* Show all the travelers for the trip based on trip_id */}
      </form>
    </div>
  );
}
