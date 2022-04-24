import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Navbardashboard from "../components/Navbardashboard";
import { getSession } from "next-auth/react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function account() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [user,setUser] = useState('')
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [bio, setBio] = useState("");

  async function commitdata() {
 
    const info = {
      user: session.user.email,
      email: email,
      firstname: firstname,
      lastname: lastname,
      bio: bio
    };

    console.log(info)
    if (!email || !email.includes("@")) return alert("Invalid email");

    const res = await fetch("/api/getUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    const data = await res.json();

    if (data.message) {
      console.log(data.message)
      return alert(data.message);
    }
    alert("Account has been update. Please sign out.");
    await signOut({callbackUrl: "/signin"});
    setEmail("");
    setFirstname("");
    setLastname("");
    setBio("");
  }

  // const [loading, setLoading] = useState(true);

  // useEffect((session) => {
  //   if (!session) {
  //     router.replace("/signin");
  //   } else setLoading(false);
  // }, []);
  // if (loading) return <p>Loading...</p>;
  // if (!session) {
  //   return <div></div>;
  // }

  if (session) {
    return (
      <div className="bg-gray-200 min-h-screen ">
        <Navbardashboard />
        <div className="container mx-auto">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <h2 className="text-2xl text-gray-900">Account Setting</h2>
           
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    forhtml="grid-text-1"
                  >
                    email address
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={session.user.email}
                    required
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    password
                  </label>
                  <button
                    className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md"
                    onClick={() => router.push("/forgotpassword")}
                  >
                    change your password
                  </button>
                </div>
                <div className="personal w-full border-t border-gray-400 pt-4">
                  <h2 className="text-2xl text-gray-900">Personal info:</h2>
                  <div className="flex items-center justify-between mt-4">
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        first name
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder={session.user.firstname}
                        type="text"
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        last name
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder={session.user.lastname}
                        type="text"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-full px-3 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Bio
                    </label>
                    <textarea
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder={session.user.bio}
                      required
                    />
                  </div>
  
                  <div className="flex justify-end">
                    <button
                      className="appearance-none bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md mr-3"
                      onClick={() => commitdata()}
                    >
                      save changes
                    </button>
                  </div>
                </div>
              </div>
         
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='bg-gray-200 min-h-screen py-8'>
        <div className='flex items-center justify-center px-3 max-w-lg mx-auto bg-white rounded-lg shadow-xl'>
          <div>
            <p className="text-center py-7"><span className="font-bold text-5xl">PLEASE-LOGIN</span></p>
            <hr />
            <div className="px-3 py-7">
              <div className="text-center py-4">
                <a href="/signin" className="no-underline bg-white hover:bg-gray-100 py-3 text-gray-800 font-semibold px-3 border border-gray-400 rounded shadow">
                  LOGIN
                </a>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
