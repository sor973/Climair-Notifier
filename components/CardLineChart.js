import React, { useState } from "react";
import Chart from "chart.js";

export default function CardLineChart({
  day0,
  day1,
  day2,
  day3,
  day4
}) {

  const [resize, setResize] = React.useState('')

  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: [
          day0.day,
          day1.day,
          day2.day,
          day3.day,
          day4.day,
        ],
        datasets: [
          {
            label: 'High Temp',
            fill: false,
            backgroundColor: "#e60e19",
            borderColor: "#e60e19",
            data: [day0.high, day1.high, day2.high, day3.high, day4.high],
          },
          {
            label: 'Low Temp',
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [day0.low, day1.low, day2.low, day3.low, day4.low],
            fill: false,
          }
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "black",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              // ticks: {
              //   fontColor: "rgba(255,255,255,.7)",
              // },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "black",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              // ticks: {
              //   fontColor: "rgba(255,255,255,.7)",
              // },
              display: true,
              scaleLabel: { 
                display: false,
                labelString: "Value",
                fontColor: "black",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [day0]);

  // React.useEffect(() => {
  //   function handleResize() {
  //     setResize('resize')
  //   }
  //   window.addEventListener('resize', handleResize)
  // })

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-black text-xl font-semibold">TEMPERATURE FORECAST</h2>
            </div>
          </div>
        </div>
        <div className="p-3 flex-auto">
          {/* Chart */}
          <div className="relative py-3">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
