"use client";
import React, { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

//user account management page

export default function User() {
  const { data: session } = useSession({ required: true });
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState();
  const [user, setUser] = useState({
    name: session?.user.name,
  });

  useEffect(() => {
    // Fetch user information here
    // Example API call:
    console.log("session", session?.user.id);
    if (session?.user.id) {
      fetch("http://localhost:3002/user/" + session?.user.id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success user:", data);
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, [session?.user.id]);

  const handleUpdate = () => {
    // Perform update logic here
    let updateUser = { ...user?.data, name: updatedUser.name };
    console.log("Updating user:", updateUser);

    try {
      fetch("http://localhost:3002/update-user/" + session?.user.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if (data.status) {
            alert("User Updated Successfully");
            router.push("/homepage");
          } else {
            alert("Failed to Update User");
            router.refresh();
          }
        });
    } catch (error) {
      console.log(error);
      alert("Failed to Update User");
    }
  };

  const handleDelete = () => {
    // Perform delete logic here
    try {
      fetch("http://localhost:3002/delete-user/" + session?.user.id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if (data.status) {
            alert("User Deleted Successfully");
            signOut({ redirect: false });
            router.push("/homepage");
          } else {
            alert("Failed to Delete User");
            router.refresh();
          }
        });
    } catch (error) {
      console.log(error);
      alert("Failed to Delete User");
    }
  };

  return (
    <div className="user-container">
      <h2>User</h2>
      {isEditing ? (
        <>
          <label>Name:</label>
          <input
            type="text"
            value={updatedUser?.name}
            onChange={(e) => setUpdatedUser({ name: e.target.value })}
          />

          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <>
          <p>Name: {user.data?.name}</p>
          <p>Account Type: {user.data?.role === 0 ? "User" : "Admin"}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}
