import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
export default function Landing() {
  const router=useNavigate();
  return (
    <div className="landingPageContainer">
      <nav>
        <h2>Meetify</h2>

        <div className="navlist">
          <p onClick={()=>{router("/auth")}}>Join as Guest</p>
          <p onClick={()=>{router("/auth")}}>Register</p>
          <div onClick={()=>{router("/auth")}} role='button'>
            <p>login</p>
          </div>
        </div>
      </nav>

      <section className="heroSection">
        <div className="leftHero">
          <span className="badge">#1 Video Meeting Platform</span>

          <h1>
            Connect <br />
            Beyond Distance
          </h1>

          <p>
            HD video meetings, screen sharing, live chat,
            and seamless collaboration anywhere.
          </p>

          <div className="heroButtons">
            <button className="primaryBtn"><Link to={"/home"}>Start Meeting</Link></button>
            <button className="secondaryBtn" onClick={()=>{router("/auth")}}>Join Meeting</button>
          </div>
        </div>
      </section>
    </div>
  );
}