"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import "./styles.css";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
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
                  {session.user.name}!
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
