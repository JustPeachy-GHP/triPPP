// import { addGroupMember } from "../../../helpers/tripAdminPage";
// import { useState } from "react";
// import { useNavigate } from "react-router";

// export default function AddGroupMemb() {
//   const [username, setUsername] = useState(null);

//   async function handleSubmit(e) {
//     try {
//       e.preventDefault();
//       const APIData = await addGroupMember(username);
//       console.log("API Data", APIData);
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         <h2> Add Traveler </h2>
//         <input
//           className="inputField"
//           id="username"
//           value={username}
//           type="text"
//           name="username"
//           placeholder="email"
//           onChange={(e) => {
//             setUsername(e.target.value);
//           }}
//         />
//       </label>
//       <button> Submit</button>
//     </form>
//   );
// }
