import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import triPPPimage from "../../Assets/triPPPimage.png";
export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    setIsOpen(true);
  }, []);
  const closeModal = () => {
    setIsOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const buttonStyle = {
    display: "block",
    margin: "0 auto",
    backgroundColor: "#8FA69D",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
  const paragraphStyle = {
    marginBottom: "20px",
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className= "postcard" sx={style}>
          <div className="modal-content">
            <div>
              <img className= "stamp" src={triPPPimage} alt="" />
            </div>
            <p className="postcard_text" style={paragraphStyle}>
              {" "}
              triPPP is a cutting-edge travel application designed to enhance
              your travel experiences. It empowers you to collaborate with
              friends to curate your travel adventures by voting on activities
              and crafting exciting trips using an intuitive map-based
              interface. You can effortlessly transition
              from your app-generated itinerary to a dedicated journaling space,
              where you can pen down your travel stories, save precious photos
              and videos, and share these cherished moments with your travel
              companions.Whether you are exploring new cities or revisiting old
              favorites, TriPPP is your ultimate travel companion.
              <br />
            </p>
            <Link to="/login">
              <button style={buttonStyle}> Take me on an adventure!</button>{" "}
              <br />{" "}
            </Link>
            <br />
          </div>
        </Box>
      </Modal>
    </div>
  );
}