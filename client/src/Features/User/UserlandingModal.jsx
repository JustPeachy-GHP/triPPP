import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import UserLanding from "./UserLanding";

export default function LandingPageModal() {
    const [isOpen, setIsOpen] =useState(true);

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const closeModal = () => {
        setIsOpen(false);
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'scroll',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className="modal-content">
            <h1>Let go on a Trippp!</h1>
            <Link to="/tripform">
                <button> Take Me On An Adventure!</button> <br />{" "}
            </Link>

            <Link to="/userlanding">
            <button> Planning In Progress</button> <br />{" "}
            </Link>
            <br />
            </div>
        
        </Box>
      </Modal>
    </div>
  );
}

