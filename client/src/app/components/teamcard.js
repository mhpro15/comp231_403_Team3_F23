import React from "react";

function TeamCard(props) {
  return (
    <div>
      <h2>{props.team.name}</h2>
      <p>{props.team.description}</p>
    </div>
  );
}

export default TeamCard;
