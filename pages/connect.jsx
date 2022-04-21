import Navbardashboard from "../components/Navbardashboard";
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession, } from "next-auth/react";

export default function connect() {
    const { data: session, status } = useSession();
    const router = useRouter()

    useEffect(() => {
        if (!session) { }
    }, [])

    if (!session) {
        return (
            <div></div>
        )
    }
    return (
        <div>
            <Navbardashboard />
            <div className='relative flex items-center justify-center bg-gray-200 font-mono  '>
                <div className='px-3  bg-white rounded-lg shadow-xl'>
                    <div>
                        <div className="text-center" >
                            <span className="border-4 border-white rounded-full mx-auto inline-block">
                                <img className=" w-200 h-200" src={`/L_gainfriends_qr.jpg`} />
                            </span>
                        </div>
                        <p className="text-center mb-5"><span className="font-bold text-2xl">Weather Forecast Bot</span></p>
                        {/* <p className="text-xs text-center mb-3">Online</p> */}
                        <hr />
                        <div className="px-10 py-5">
                            <div className="text-center">
                                <a href="https://lin.ee/A8dy2Q7" className="no-underline bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                    CONNECT
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}