import React from "react";
import kirbyavatar from "../../Assets/kirbyavatar.png";
import amyavatar from "../../Assets/amyavatar.png";

export default function Aboutpage() {
  return (
    <div className="about-me">
      <h1 style={{ color: "blue", fontSize: "24px", fontFamily: "Arial" }}>
        About the Team
      </h1>

      <img
        src={amyavatar}
        alt="AmyAvatar"
        style={{ width: "200px", height: "200px", borderRadius: "50%" }}
      />

      <p style={{ color: "green", fontSize: "18px", fontFamily: "Helvetica" }}>
        Amy Kwong
        <br /> Linkedin: www.linkedin.com/in/amy-kwong
        <br /> Github:https://github.com/Amy-Kw
        <br /> Bucket List Travel Destination: Greece, Finland
      </p>

      <img
        src={kirbyavatar}
        alt="KirbyAvatar"
        style={{ width: "200px", height: "200px", borderRadius: "50%" }}
      />
      <p
        style={{ color: "purple", fontSize: "16px", fontFamily: "Courier New" }}
      >
        Kirby Schuetz
        <br /> LinkedIn: https://www.linkedin.com/in/kirby-schuetz/
        <br /> Github: https://github.com/Kirby-Schuetz
        <br /> Bucket List Destination: Lisbon, Portugal
      </p>

      <img
        src={kirbyavatar}
        alt="KirbyAvatar"
        style={{ width: "200px", height: "200px", borderRadius: "50%" }}
      />
      <p
        style={{ color: "red", fontSize: "20px", fontFamily: "Comic Sans MS" }}
      >
        Stephanie Tayengco
        <br /> LinkedIn: www.linkedin.com/in/stephanie-tayengco
        <br /> Github: https://github.com/STayengco
        <br /> Bucket List Destination: Machu Picchu
      </p>

      <img
        src={kirbyavatar}
        alt="KirbyAvatar"
        style={{ width: "200px", height: "200px", borderRadius: "50%" }}
      />
      <p style={{ color: "orange", fontSize: "22px", fontFamily: "Verdana" }}>
        Jaclyn Barbieri
        <br /> Linkedin: https://www.linkedin.com/in/jaclyn-barbieri/
        <br /> Github: https://github.com/uhohjackieson
        <br /> Bucket List Destination: Giza, Egypt
      </p>

      <img
        src={kirbyavatar}
        alt="KirbyAvatar"
        style={{ width: "200px", height: "200px", borderRadius: "50%" }}
      />
      <p style={{ color: "pink", fontSize: "19px", fontFamily: "Georgia" }}>
        Gaby Markley
        <br />
        Linkedin: https://www.linkedin.com/in/gaby-markley/
        <br /> Github:https://github.com/Gaby-Markley
        <br /> Bucket List Travel Destination: Antarctica
      </p>
    </div>
  );
}
