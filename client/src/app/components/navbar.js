"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav>
      <button type="button" onClick={() => router.push("/")}>
        Home
      </button>
      <button type="button" onClick={() => router.push("/login")}>
        Login
      </button>
      <button type="button" onClick={() => router.push("/register")}>
        Register
      </button>
    </nav>
  );
}
