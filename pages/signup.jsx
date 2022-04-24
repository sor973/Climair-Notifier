import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Navbar from "../components/Navbar";

export default function register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function registry() {
    if (!email || !email.includes("@") || !password)
      return alert("Invalid details");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();
    if (data.message) return alert(data.message);
    alert("User created");
    router.push("/signin");
    setEmail("");
    setPassword("");
  }

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSession().then((session) => {
      if (session) router.replace("/");
      else setLoading(false);
    });
  }, []);
  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-gray-900">
      <Navbar />
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white pb-20">
        <section className="flex w-[30rem] flex-col space-y-10 px-5">
          <div className="text-center text-4xl font-medium">
            Create an account
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <button
            onClick={registry}
            className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
          >
            Register
          </button>

          <p className="text-center text-lg">
            <> or </>
            <a
              href="/forgotpassword"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline"
            >
              Forgot password
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}
