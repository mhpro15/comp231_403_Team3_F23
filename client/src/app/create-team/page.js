"use client";
import React, { useState } from "react";
import "./create-team.css";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreateTeam = () => {
  const { data: session, status, user } = useSession({ required: true });
  const router = useRouter();

  // if (!session) router.replace("login");
  const [teamName, setTeamName] = useState("");
  const [hackathonName, setHackathonName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  // console.log("session", session?.user.id);

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleHackathonNameChange = (event) => {
    setHackathonName(event.target.value);
  };

  const handleTeamDescriptionChange = (event) => {
    setTeamDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation and submit the form data to the server
    // ...

    // Reset the form fields
    let leaderID = session?.user.id;

    if (leaderID) {
      fetch("http://localhost:3002/team/create-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: leaderID,
          teamName,
          hackathonName,
          teamDescription,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          router.push("homepage");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    setTeamName("");
    setHackathonName("");
    setTeamDescription("");
  };

  return (
    <div className="create-team-container">
      <h1>Create Team{session?.user.username}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Team Name:
          <input type="text" value={teamName} onChange={handleTeamNameChange} />
        </label>
        <br />
        <label>
          Hackathon Name:
          <input
            type="text"
            value={hackathonName}
            onChange={handleHackathonNameChange}
          />
        </label>
        <br />
        <label>
          Team Description:
          <textarea
            value={teamDescription}
            onChange={handleTeamDescriptionChange}
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTeam;
