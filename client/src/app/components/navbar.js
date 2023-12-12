"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import "./styles.css";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  const [user, setUser] = useState({
    data: { name: session?.user.name },
  });
  useEffect(() => {
    // Fetch user information here
    // Example API calls:
    console.log("session", session?.user.id);

    fetch("http://localhost:3002/user/" + session?.user.id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success user:", data);
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
      });
  }, [session?.user.id]);
  return (
    <div className="navbar">
      <nav>
        <button type="button" onClick={() => router.push("/")}>
          Home
        </button>
        <div className="navbar-right">
          {session?.user ? (
            <>
              <button type="button" onClick={() => router.push("/create-team")}>
                Create Team
              </button>
              <span>
                Welcome,{" "}
                <button type="button" onClick={() => router.push("/user")}>
                  {user?.data?.name}!
                </button>
              </span>
              <button
                type="button"
                onClick={() => signOut({ redirect: false })}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => router.push("/login")}>
                Login
              </button>
              <button type="button" onClick={() => router.push("/register")}>
                Register
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
