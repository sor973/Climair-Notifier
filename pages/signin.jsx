import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import Navbar from "../components/Navbar";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function signin() {
    if (!email || !email.includes("@") || !password)
      return alert("Invalid details");

    await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    const session = await getSession();
    if (!session) return alert("Wrong username or password");

    router.push("/");
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
    <div>
      <Navbar/>
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium">Sign in</div>

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
            onClick={signin}
            className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400"
          >
            SIGN IN
          </button>

          <p className="text-center text-lg">
            <>No account? </>
            <a
              href="/signup"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline"
            >
              Create One
            </a>
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
