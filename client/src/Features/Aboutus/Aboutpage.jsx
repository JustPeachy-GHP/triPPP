import React from "react";
import kirbyavatar from "../../Assets/kirbyavatar.png";
import amyavatar from "../../Assets/amyavatar.png";
import jackieavatar from "../../Assets/jackieavatar.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MapIcon from "@mui/icons-material/Map";
import { Link } from "react-router-dom";
import AboutMap from "./AboutMap";

export default function Aboutpage() {
  const commonStyles = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    margin: "10px",
    textAlign: "center",
  };

  return (
    <div
      className="about-me"
      style={{
        marginTop: "100px",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, padding: "10px" }}>
        <h1
          style={{
            color: "black",
            fontSize: "24px",
            fontFamily: "Arial",
            width: "100%",
            textAlign: "center",
          }}
        >
          About the Team
        </h1>

        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <img src={amyavatar} alt="AmyAvatar" style={{ ...commonStyles }} />
          <p
            style={{
              color: "black",
              fontSize: "13px",
              fontFamily: "Arial",
              fontWeight: "bold",
            }}
          >
            Amy Kwong
            <br /> <LinkedInIcon />{" "}
            <Link style={{ color: "blue" }}>
              LinkedIn: www.linkedin.com/in/amy-kwong
            </Link>
            <br /> <GitHubIcon /> Github: https://github.com/Amy-Kw
            <br /> <MapIcon /> Bucket List Travel Destination: Greece, Finland
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <img
            src={kirbyavatar}
            alt="KirbyAvatar"
            style={{ ...commonStyles }}
          />
          <p
            style={{
              color: "black",
              fontSize: "13px",
              fontFamily: "Arial",
              fontWeight: "bold",
            }}
          >
            Kirby Schuetz
            <br /> <LinkedInIcon /> LinkedIn:
            https://www.linkedin.com/in/kirby-schuetz/
            <br /> <GitHubIcon /> Github: https://github.com/Kirby-Schuetz
            <br /> <MapIcon />
            Bucket List Destination: Lisbon, Portugal
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <img
            src={kirbyavatar}
            alt="KirbyAvatar"
            style={{ ...commonStyles }}
          />
          <p
            style={{
              color: "black",
              fontSize: "13px",
              fontFamily: "Arial",
              fontWeight: "bold",
            }}
          >
            Stephanie Tayengco
            <br /> <LinkedInIcon /> LinkedIn:
            www.linkedin.com/in/stephanie-tayengco
            <br /> <GitHubIcon /> Github: https://github.com/STayengco
            <br /> <MapIcon /> Bucket List Destination: Machu Picchu
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <img
            src={jackieavatar}
            alt="JackieAvatar"
            style={{ ...commonStyles }}
          />
          <p
            style={{
              color: "black",
              fontSize: "13px",
              fontFamily: "Arial",
              fontWeight: "bold",
            }}
          >
            Jaclyn Barbieri
            <br /> <LinkedInIcon /> Linkedin:
            https://www.linkedin.com/in/jaclyn-barbieri/
            <br /> <GitHubIcon /> Github: https://github.com/uhohjackieson
            <br /> <MapIcon /> Bucket List Destination: Giza, Egypt
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <img
            src={kirbyavatar}
            alt="KirbyAvatar"
            style={{ ...commonStyles }}
          />
          <p
            style={{
              color: "black",
              fontSize: "13px",
              fontFamily: "Arial",
              fontWeight: "bold",
            }}
          >
            Gaby Markley
            <br /> <LinkedInIcon />
            Linkedin: https://www.linkedin.com/in/gaby-markley/
            <br /> <GitHubIcon /> Github: https://github.com/Gaby-Markley
            <br /> <MapIcon /> Bucket List Travel Destination: Antarctica
          </p>
        </div>
      </div>

      <div style={{ flex: 2 }}>
        <AboutMap />
      </div>
    </div>
  );
}
