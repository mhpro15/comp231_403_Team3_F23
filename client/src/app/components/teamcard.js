import React from "react";

function TeamCard(props) {
  return (
    <div className="card">
      <h2>{props.team.teamName}</h2>
      <p>Hackathon: {props.team.hackathonName}</p>
      <p>Leader: {props.team.leader.name}</p>
      <button type="button">Join</button>
    </div>
  );
}

export default TeamCard;
