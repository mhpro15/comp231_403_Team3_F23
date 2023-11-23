"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./register.css";

export default function Register() {
  // State to track registration form fields
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here
    // For simplicity, let's just log the registration details for now
    console.log("Username:", username);
    console.log("Name:", name);
    console.log("Password:", password);

    try {
      let body = {
        username: username,
        name: name,
        password: password,
      };
      fetch("http://localhost:3002/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status) {
            alert("User Created Successfully");
            router.push("/login");
          } else {
            alert("Failed to Create User");
            router.refresh();
          }
        });
    } catch (error) {
      console.log(error);
      alert("Failed to Create User");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
