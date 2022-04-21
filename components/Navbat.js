import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function Navbat() {
  const { data: session, status } = useSession();
  return (
    <nav className="header">
      <h1 className="logo">
        <a href="/">NextAuth</a>
      </h1>
      <ul className={!session && status === "loading" ? "loading" : "loaded"}>
        {!session && status !== "authenticated" && (
          <li>
            <Link href="/signin">
              <a>Sign In</a>
            </Link>
          </li>
        )}
        {session && status !== "unauthenticated" && (
          <li>
            <Link href="/api/auth/signout">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign Out
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbat;
