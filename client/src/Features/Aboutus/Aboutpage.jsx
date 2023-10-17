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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Aboutpage() {
  const renderAvatarCard = (
    avatarSrc,
    name,
    linkedinLink,
    githubLink,
    travelDestination,
    width = "200px",
    height = "160px"
  ) => (
    <Card style={{ width: "450px", margin: "10px" }}>
      <div style={{ display: "flex" }}>
        <div>
          <img
            src={avatarSrc}
            alt={`${name} Avatar`}
            style={{
              width,
              height,
              borderRadius: "50%",
              margin: "10px",
              textAlign: "center",
            }}
          />
        </div>
        <div style={{ marginLeft: "20px" }}>
          <Typography
            variant="h5"
            style={{ fontFamily: "Arial", fontWeight: "bold", margin: "10px" }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            style={{ fontFamily: "Arial", fontWeight: "bold", margin: "10px" }}
          >
            <LinkedInIcon />{" "}
            <Link to={linkedinLink} style={{ color: "blue" }}>
              {linkedinLink}
            </Link>
            <br />
            <GitHubIcon />{" "}
            <Link to={githubLink} style={{ color: "blue" }}>
              {githubLink}
            </Link>
            <br />
            <MapIcon /> Bucket List Travel Destination: {travelDestination}
          </Typography>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="about-me" style={{ marginTop: "100px", display: "flex" }}>
      <div style={{ flex: 1, padding: "10px" }}>
        <h1
          style={{
            color: "black",
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "Arial",
            width: "100%",
            textAlign: "center",
          }}
        >
          About the Team
        </h1>

        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          {renderAvatarCard(
            amyavatar,
            "Amy Kwong",
            "https://www.linkedin.com/in/amy-kwong",
            "https://github.com/Amy-Kw",
            "Greece, Finland"
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          {renderAvatarCard(
            kirbyavatar,
            "Kirby Schuetz",
            "https://www.linkedin.com/in/kirby-schuetz/",
            "https://github.com/Kirby-Schuetz",
            "Lisbon, Portugal"
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          {renderAvatarCard(
            stephanieavatar,
            "Stephanie Tayengco",
            "www.linkedin.com/in/stephanie-tayengco",
            "https://github.com/STayengco",
            "Machu Picchu",
            "170px",
            "170px"
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          {renderAvatarCard(
            jackieavatar,
            "Jaclyn Barbieri",
            "https://www.linkedin.com/in/jaclyn-barbieri/",
            "https://github.com/uhohjackieson",
            "Giza, Egypt"
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          {renderAvatarCard(
            gabyavatar,
            "Gaby Markley",
            "https://www.linkedin.com/in/gaby-markley/",
            "https://github.com/Gaby-Markley",
            "Antarctica"
          )}
        </div>
      </div>

      <div>
        <AboutMap />
      </div>
    </div>
  );
}
