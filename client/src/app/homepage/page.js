import React from "react";
import TeamList from "../components/teamlist";
import "./homepage.css";

const teams = [
  { id: 1, name: "Team A", description: "This is Team A" },
  { id: 2, name: "Team B", description: "This is Team B" },
  { id: 3, name: "Team C", description: "This is Team C" },
];

function HomePage() {
  return (
    <div className="homeDiv text">
      <h1>TEAMS</h1>
      <TeamList teams={teams} />
    </div>
  );
}

export default HomePage;
