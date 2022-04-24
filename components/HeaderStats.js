import React, { useEffect } from "react";

// components
import "@fortawesome/fontawesome-free/css/all.min.css";
import CardStats from "./CardStats.js";

export default function HeaderStats({
  today,
  aqi
}) {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardStats
            statSubtitle="Temperature"
            statTitle={today.temp}
            statArrow="up"
            statPercent="3.48"
            statPercentColor="text-emerald-500"
            statDescripiron="Since yesterday"
            statIconName="fas fa-thermometer-full"
            statIconColor="bg-red-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardStats
            statSubtitle="Humidity"
            statTitle={today.humidity}
            statArrow="down"
            statPercent="3.48"
            statPercentColor="text-red-500"
            statDescripiron="Since yesterday"
            statIconName="fas fa-tint"
            statIconColor="bg-orange-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardStats
            statSubtitle="Air Quality"
            statTitle={aqi}
            statArrow="down"
            statPercent="1.10"
            statPercentColor="text-orange-500"
            statDescripiron="Since yesterday"
            statIconName="fas fa-wind"
            statIconColor="bg-pink-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardStats
            statSubtitle="Weather"
            statTitle={today.skytext}
            statdes="disable"
            statPercent="cloudy"
            statPercentColor="text-emerald-500"
            statDescripiron="Since yesterday"
            statIconName="fas fa-cloud-sun"
            statIconColor="bg-blue-500"
          />
        </div>
      </div>
    </>
  );
}
