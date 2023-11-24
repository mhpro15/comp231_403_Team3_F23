"use client";
import React, { useState, useEffect } from "react";
import TeamList from "../components/teamlist";
import "./homepage.css";

function HomePage() {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3002/team/team-list")
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setTeams(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="homeDiv text">
      <h1>TEAMS</h1>
      <TeamList teams={teams} />
    </div>
  );
}

export default HomePage;
