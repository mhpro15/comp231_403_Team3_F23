"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <nav>
      <button type="button" onClick={() => router.push("/")}>
        Home
      </button>
      {session?.user ? (
        <>
          <span>Welcome, {session.user.name}!</span>
          <button type="button" onClick={() => signOut()}>
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
    </nav>
  );
}
