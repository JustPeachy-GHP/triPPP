// export default function ItineraryItems({ index, locid, displayname, rating, classtype }) {
//   return (

//  <span >
//     <div key={index} locid={locid} className={classtype} draggable>
//       <h2>{displayname}</h2>
//       {rating !== "" ? <p>Average vote: {rating}</p> : null}
//     </div>
//   </span>
   
//   );
// }

export default function ItineraryItems({ locid, displayname, rating, classtype }) {
  return (
    <span draggable={true}>
      <div className={classtype}>
        <h2>{displayname}</h2>
        {rating !== "" ? <p>Average vote: {rating}</p> : null}
      </div>
    </span>
  );
}

