import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";

export default function Navbar({ fixed }) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const { data: session, status } = useSession();
    return (
        <>
            <div className={!session && status === "loading" ? "loading" : "loaded"}>
                <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-sky-500 mb-3">
                    <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                            <h2
                                className="font-bold text-xl leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white"
                                href="#pablo"
                            >
                                Climaire Notifier
                            </h2>
                            <button
                                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                                type="button"
                                onClick={() => setNavbarOpen(!navbarOpen)}
                            >
                                <i className="fas fa-bars"></i>
                            </button>
                        </div>
                        <div
                            className={
                                "lg:flex flex-grow items-center" +
                                (navbarOpen ? " flex" : " hidden")
                            }
                            id="example-navbar-danger"
                        >
                            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                <li className="nav-item">
                                    <a
                                        className="no-underline px-3 py-2 flex items-center text-ml leading-snug text-white hover:opacity-75"
                                        href="/signin"
                                    >
                                        <i className=" text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Sign in</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="no-underline px-3 py-2 flex items-center text-ml leading-snug text-white hover:opacity-75"
                                        href="signup"
                                    >
                                        <i className=" text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Sign up</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
