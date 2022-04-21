import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";

export default function Navbardashboard({ fixed }) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
            <nav className="relative flex  justify-between px-2 py-1 bg-sky-500 mb-3">
                <div className="container px-2  flex justify-between">
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
                        <Dropdown className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Setting
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/account">Account</Dropdown.Item>
                                <Dropdown.Item href="/connect">Connect</Dropdown.Item>
                                <Dropdown.Item ><Link href="/api/auth/signout"><a className='no-underline' onClick={(e) => {e.preventDefault(); signOut({callbackUrl: "/signin"});}}> Sign out</a></Link></Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </>
    );
}
