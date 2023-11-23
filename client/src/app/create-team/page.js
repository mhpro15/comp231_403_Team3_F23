"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CreateTeamPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) router.replace("login");
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  console.log("session", session);

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleTeamDescriptionChange = (event) => {
    setTeamDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation and submit the form data to the server
    // ...

    // Reset the form fields
    setTeamName("");
    setTeamDescription("");
  };

  return (
    <div>
      <h1>Create Team</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Team Name:
          <input type="text" value={teamName} onChange={handleTeamNameChange} />
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

export default CreateTeamPage;
