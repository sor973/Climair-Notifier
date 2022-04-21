import Navbat from '../components/Navbat'


export default function connect() {


    return (
        <div>
            <Navbat />
            <div className='flex items-center justify-center bg-gray-200 min-h-screen font-mono  '>

                <div className='px-3 max-w-lg mx-auto bg-white rounded-lg shadow-xl'>
                    <div>
                        <div className="text-center" >
                            <span className="border-4 border-white rounded-full mx-auto inline-block">
                       
                                <img className=" w-200 h-200" src={`/L_gainfriends_qr.jpg` } /> 

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