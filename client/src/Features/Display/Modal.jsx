
import React, { useState } from "react";
import Navtitle from "../Display/Navtitle"

export default function Modal() {
  const [modal, setModal] = useState(false);

  //this helps with opening then model like a isOpen
  const toggleModal = () => {
    setModal(!modal)
  }

  //this part hmm - also this part suppose to prevent the back of the overlay from scrolling up and down when the window pops up
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
    
    <button className="buttonmodal" onClick={toggleModal} >
        <Navtitle/>
        put links of the login/ register / trip vibe / and trip form here maybe -nope this is a button that opens h2 and whatever below - click and close
    </button>

    {modal && (

    <div className="modal">

        <div 
        onClick={toggleModal} 
        className="overlay"> 
        </div>

        <div 
        className="modal-content">
            <h2>Title of the modal</h2>
             <p>
                your description, like you successfull made an account
             </p>
            <button className="close-modal" onClick={toggleModal}>
                CLOSE - closes from h2 to p
            </button>
        </div>
    </div>

    )}

 <p>
    maybe put links here? Discriptions of whatever is on the browser page
 </p>

    </>

  );
};


//overlay need to have some css to make the size of the overlay - the see through black curtan thing
//&& - if true?