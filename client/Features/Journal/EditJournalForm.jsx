// import { useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { updateJournal } from "../../journals";
// import { fetchSingleJournal } from "../../journals";

// export default function EditJournal(token, user) {
//   const { journal_id } = useParams();

//   const [videocontent, setVideocontent] = useState("");
//   const [image, setImage] = useState("");
//   const [title, setTitle] = useState("");
//   const [timestamp, setTimestamp] = useState("");
//   const [entry, setEntry] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getSingleJournal() {
//         try{
//             const response = await fetchSingleJournal(journal_id)
//             setVideocontent(response[0].videocontent)
//             setImage(response[0].image)
//             setTitle(response[0].title)
//             setTimestamp(response[0].timestamp)
//             setEntry(response[0].entry)
//         } catch(error) {
//             console.error("trouble getting journal to EDIT", error)
//         }
//     }
//     getSingleJournal();
//   }, [journal_id])

//   async function handleSubmit(e) {
//     // add timestamp???


//   }
// }
