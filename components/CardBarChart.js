import React from "react";


export default function CardBarChart({
  weather
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-xl font-semibold">
                TOMORROW
              </h2>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 flex-auto">
          <div className="relative h-500-px">
            <h5 className="text-4xl font-semibold text-center ">
              {weather.skytextday}
            </h5>
          </div>
        </div>
        <div className="px-4 py-3 flex-auto">
          <div className="relative h-500-px">
            <table className=" mx-auto">
              <tbody>
                <tr>
                  <td>
                    <h2 className="text-xl font-semibold text-left py-3 px-5">
                      {weather.high} H Temp
                    </h2>
                  </td>
                  <td>
                    <h2 className="text-xl font-semibold text-left py-3 px-5">
                      {weather.low} L Temp
                    </h2>
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
        </div>
      </div>
    </>
  );
}
