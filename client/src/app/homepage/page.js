import React from "react";
import TeamCard from "../components/teamcard";

const teams = [
  { id: 1, name: "Team A", description: "This is Team A" },
  { id: 2, name: "Team B", description: "This is Team B" },
  { id: 3, name: "Team C", description: "This is Team C" },
];

function TeamList({ teams }) {
  return (
    <div>
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <h1>Teams</h1>
      <TeamList teams={teams} />
    </div>
  );
}

export default HomePage;
