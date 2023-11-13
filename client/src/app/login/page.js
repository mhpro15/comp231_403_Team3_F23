"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// import { authOptions } from "../api/auth/[...nextauth]/route.js";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  if (session) router.replace("homepage");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform authentication logic here with username and password
    // For simplicity, let's just log the credentials for now
    console.log("Username:", username);
    console.log("Password:", password);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res.error) {
        // setError("Invalid Credentials");
        return;
      }

      router.replace("homepage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Welcome to Login Page</h2>
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
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
