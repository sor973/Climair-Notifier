import React, { useEffect, useState } from 'react';
import HeaderStats from '../components/HeaderStats'
import CardBarChart from '../components/CardBarChart';
import CardLineChart from '../components/CardLineChart';
import Dropdownf from '../components/Dropdown';
import Navbardashboard from '../components/Navbardashboard';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  // console.log(session)
  const [aqi, setAqi] = useState('');
  const [today, setToday] = useState('');
  const [fore0, setFore0] = useState({});
  const [fore1, setFore1] = useState({});
  const [fore2, setFore2] = useState({});
  const [fore3, setFore3] = useState({});
  const [fore4, setFore4] = useState({});
  const [lo, setLo] = useState({ locate: 'Bangkok, Thailand', cord: { lat: 13.736717, long: 100.523186 } });
  useEffect(() => {
    if (!session) {router.push("/signin")}
    else{
      const getdata = async (e) => {

        const response = await fetch("/api/getTemp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(lo),
        });

        const data = await response.json();

        setAqi(data.aqi)
        setToday(data.current)

        setFore0(data.forecast[0])
        setFore1(data.forecast[1])
        setFore2(data.forecast[2])
        setFore3(data.forecast[3])
        setFore4(data.forecast[4])
      };
      getdata()
    }
  }, [lo])
  if (!session) {
    return (
      <div></div>
    )
  }
  return (

    <div>
      <Navbardashboard />
      <div className="relative md:pt-5 pb-20 pb-5 ">
        <div className="px-4 md:px-10 mx-auto w-full space-y-5">
          <div className='flex justify-between px-4'>
            <h1 className="text-black text-3xl font-semibold ">{today.day}, {today.date}</h1>
            <Dropdownf
              setLo={setLo}
            />
          </div>
          <HeaderStats
            today={today}
            aqi={aqi}
          />
        </div>
      </div>

      <div className="flex flex-wrap px-4 md:px-10 mx-auto w-full ">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-1 px-3">
          <CardLineChart
            day0={fore0}
            day1={fore1}
            day2={fore2}
            day3={fore3}
            day4={fore4}
          />
        </div>
        <div className="w-full xl:w-4/12 mb-12 xl:mb-1 px-3">
          <CardBarChart
            weather={fore2}
          />
        </div>
      </div>
      <div className='text-center'>
        <h1 className=" text-cyan-500 text-5xl">
          location
        </h1>
        <h1 className="text-7xl">
          {lo.locate}
        </h1>
      </div>
    </div>
  )
}
