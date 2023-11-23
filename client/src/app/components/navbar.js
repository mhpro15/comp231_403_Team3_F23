"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import "./styles.css";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

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
              <span>Welcome, {session.user.name}!</span>
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
