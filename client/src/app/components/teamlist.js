import React from "react";
import TeamCard from "./teamcard";

export default function TeamList(props) {
  return (
    <div>
      {props.teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}
