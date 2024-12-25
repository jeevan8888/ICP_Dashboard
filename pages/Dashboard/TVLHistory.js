import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from "axios";
import { format } from 'date-fns';

import { Card } from '../../ui/components/card';
import { Divide } from '../../ui/components/divide';

const BarChart = dynamic(() => import('../../ui/chart/BarChart'), {
  ssr: false, // Disable server-side rendering
});

const TvlHistory = () => {

  const [TVLData, setTVLData] = useState([]);
  const [chartDataX, setChartDataX] = useState([]);
  const [chartDataY, setChartDataY] = useState([]);

  // Fetch TVL data on component mount
  const getTVLData = () => {
    axios.get("https://api.llama.fi/v2/historicalChainTvl/ICP")
      .then((response) => {
        const formattedTVLData = response.data.reverse().map(item => ({
          date: format(new Date(item.date * 1000), 'yyyy-MM-dd'), // Convert Unix timestamp to date
          tvl: item.tvl
        }));
        setTVLData(formattedTVLData);
      })
      .catch((error) => console.error("Error fetching TVL data:", error));
  };

  // Call getTVLData once on component mount
  useEffect(() => {
    getTVLData();
  }, []); // Empty dependency array to only run once on mount

  // Update chart data when TVLData is updated
  useEffect(() => {
    if (TVLData.length > 0) { // Ensure TVLData is fetched
      showChartData("1W"); // Only call showChartData when TVLData has data
    }
  }, [TVLData]); // Only trigger when TVLData changes

  // Function to set chart data
  const showChartData = (type) => {
    let tmpdata = [];
    let datax = [];
    let datay = [];

    // Handle different types of chart data
    if (type === '1W') {
      tmpdata = TVLData.slice(0, 7).reverse(); // First 7 days
    }
    else if (type === "1M") {
      tmpdata = TVLData.slice(0, 30).reverse(); // All available data for 1Y
    }
    else if (type === "3M") {
        tmpdata = TVLData.slice(0, 90).reverse(); // All available data for 1Y
    }
    else if (type === "6M") {
        tmpdata = TVLData.slice(0, 180).reverse(); // All available data for 1Y
    }
    else if (type === "1Y") {
        tmpdata = TVLData.slice(0, 365).reverse(); // All available data for 1Y
    }
    else if (type === "ALL") {
        tmpdata = TVLData.reverse(); // All available data for 1Y
    }

    // Extract x and y data
    datax = tmpdata.map(item => item.date);
    datay = tmpdata.map(item => Math.floor(item.tvl));

    // Only update state if data has changed to avoid infinite loops
    if (JSON.stringify(datax) !== JSON.stringify(chartDataX)) {
      setChartDataX(datax); // Update chartDataX if different
    }
    if (JSON.stringify(datay) !== JSON.stringify(chartDataY)) {
      setChartDataY(datay); // Update chartDataY if different
    }
  };

    return (
        <div className="relative flex flex-col rounded-xl bg-[#1F2022] bg-clip-border text-gray-700 shadow-md">
            <Card>
                <div className="relative mx-4 mt-4 flex flex-col justify-between gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
                    <div className="flex gap-2 w-max rounded-lg p-5 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="h-6 w-6"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                            ></path>
                        </svg>
                        <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-[#67707E] antialiased">
                            Protocol Value History
                        </h6>
                    </div>
                    <div>
                        <div class="row flex">
                            <button class="rounded-md rounded-r-none bg-[#21262B] py-0 px-3 mx-0 border border-transparent text-center text-sm text-[#505762] transition-all shadow-sm hover:shadow focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                Volume
                            </button>
                            <button class="rounded-md rounded-l-none bg-[#21262B] py-0 px-3 mx-0 border border-transparent text-center text-sm text-[#505762] transition-all shadow-sm hover:shadow focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                TVL
                            </button>
                        </div>
                    </div>
                </div>
                <Divide />
                <div className='p-3'>
                    {(chartDataX.length > 0 && chartDataY.length > 0) &&  <BarChart
                        chartDataX = {chartDataX}
                        chartDataY = {chartDataY}
                        chartID = {'TVL'}
                        color1 = {'#1ABC7B'}
                        color2 = {'#0C5638'}
                    />}
                </div>
                <div>
                    <div class="row flex justify-center items-center">
                        <button onClick={() => showChartData("1W")} class="rounded-md rounded-r-none bg-[#21262B] py-0 px-3 mx-0 border border-transparent text-center text-sm text-[#505762] transition-all shadow-sm hover:shadow focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            1W
                        </button>
                        <button onClick={() => showChartData("1M")} class="rounded-none bg-[#21262B] py-0 px-3 mx-0 border-l border-r border-slate-700 text-center text-sm text-[#505762] transition-all shadow-md hover:shadow-lg focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            1M
                        </button>
                        <button onClick={() => showChartData("3M")} class="rounded-none bg-[#21262B] py-0 px-3 mx-0 border-l border-r border-slate-700 text-center text-sm text-[#505762] transition-all shadow-md hover:shadow-lg focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            3M
                        </button>
                        <button onClick={() => showChartData("6M")} class="rounded-none bg-[#21262B] py-0 px-3 mx-0 border-l border-r border-slate-700 text-center text-sm text-[#505762] transition-all shadow-md hover:shadow-lg focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            6M
                        </button>
                        <button onClick={() => showChartData("1Y")} class="rounded-none bg-[#21262B] py-0 px-3 mx-0 border-l border-r border-slate-700 text-center text-sm text-[#505762] transition-all shadow-md hover:shadow-lg focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            1Y
                        </button>
                        <button onClick={() => showChartData("ALL")} class="rounded-md rounded-l-none bg-[#21262B] py-0 px-3 mx-0 border border-transparent text-center text-sm text-[#505762] transition-all shadow-sm hover:shadow focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            All
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TvlHistory;
