import React from "react";
import TeamCard from "./teamcard";

export default function TeamList(props) {
  return (
    <div className="filter-container">
      <div className="team-list">
        {props.teams.map((team) => (
          <div key={team.id} className="team-item">
            <TeamCard team={team} />
          </div>
        ))}
      </div>
    </div>
  );
}
