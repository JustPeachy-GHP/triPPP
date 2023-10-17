import React from "react";
import kirbyavatar from "../../Assets/kirbyavatar.png";
import amyavatar from "../../Assets/amyavatar.png";
import jackieavatar from "../../Assets/jackieavatar.png";
import gabyavatar from "../../Assets/gabyavatar.png";
import stephanieavatar from "../../Assets/stephanieavatar.png";
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
            <Link to="www.linkedin.com/in/amy-kwong" style={{ color: "blue" }}>
              www.linkedin.com/in/amy-kwong
            </Link>
            <br /> <GitHubIcon />{" "}
            <Link to="https://github.com/Amy-Kw" style={{ color: "blue" }}>
              https://github.com/Amy-Kw
            </Link>
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
            <br /> <LinkedInIcon />{" "}
            <Link
              to="https://www.linkedin.com/in/kirby-schuetz/"
              style={{ color: "blue" }}
            >
              https://www.linkedin.com/in/kirby-schuetz/
            </Link>
            <br /> <GitHubIcon />{" "}
            <Link
              to="https://github.com/Kirby-Schuetz"
              style={{ color: "blue" }}
            >
              {" "}
              https://github.com/Kirby-Schuetz
            </Link>
            <br /> <MapIcon />
            Bucket List Destination: Lisbon, Portugal
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <img
            src={stephanieavatar}
            alt="StephanieAvatar"
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
            <br /> <LinkedInIcon />{" "}
            <Link
              to="www.linkedin.com/in/stephanie-tayengco"
              style={{ color: "blue" }}
            >
              www.linkedin.com/in/stephanie-tayengco
            </Link>
            <br /> <GitHubIcon />{" "}
            <Link to="https://github.com/STayengco" style={{ color: "blue" }}>
              {" "}
              https://github.com/STayengco
            </Link>
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
            <br /> <LinkedInIcon />{" "}
            <Link
              style={{ color: "blue" }}
              to="https://www.linkedin.com/in/jaclyn-barbieri/"
            >
              https://www.linkedin.com/in/jaclyn-barbieri/
            </Link>
            <br /> <GitHubIcon />{" "}
            <Link
              style={{ color: "blue" }}
              to="https://github.com/uhohjackieson"
            >
              {" "}
              https://github.com/uhohjackieson
            </Link>
            <br /> <MapIcon /> Bucket List Destination: Giza, Egypt
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <img src={gabyavatar} alt="GabyAvatar" style={{ ...commonStyles }} />
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
            <Link
              style={{ color: "blue" }}
              to="https://www.linkedin.com/in/gaby-markley/"
            >
              {" "}
              https://www.linkedin.com/in/gaby-markley/
            </Link>
            <br /> <GitHubIcon />{" "}
            <Link
              style={{ color: "blue" }}
              to="https://github.com/Gaby-Markley"
            >
              {" "}
              https://github.com/Gaby-Markley
            </Link>
            <br /> <MapIcon /> Bucket List Travel Destination: Antarctica
          </p>
        </div>
      </div>

      <div>
        <AboutMap />
      </div>
    </div>
  );
}
