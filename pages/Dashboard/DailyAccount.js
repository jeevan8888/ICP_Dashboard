import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from "axios";
import { format } from 'date-fns';

import { Card } from '../../ui/components/card';
import { Divide } from '../../ui/components/divide';

const BarChartAccount = dynamic(() => import('../../ui/chart/BarChartAccount'), {
  ssr: false, // Disable server-side rendering
});

const DailyAccount = () => {

const [AccountData, setAccountData] = useState([]);
  const [chartDataX, setChartDataX] = useState([]);
  const [chartDataY, setChartDataY] = useState([]);
  const getAccountData = () => {
  axios.get("https://ledger-api.internetcomputer.org/metrics/unique-accounts-per-day")
    .then((response) => {
      console.log("Response data:", response.data);
      const accountData = response.data.data;
      if (Array.isArray(accountData)) {
        const formattedAccountData = accountData.reverse().map(item => {
          return {
            date: item.date ? format(new Date(item.date), 'yyyy-MM-dd') : null,
            all_count: item.all_count
          };
        });
        setAccountData(formattedAccountData);
      } else {
        console.error("Account data is not an array", accountData);
      }
    })
    .catch((error) => console.error("Error fetching Account data:", error));
};

  useEffect(() => {
    getAccountData();
  }, []);

  useEffect(() => {
    if (AccountData.length > 0) { 
      showChartData("1W"); 
    }
  }, [AccountData]); 

  const showChartData = (type) => {
    let tmpdata = [];
    let datax = [];
    let datay = [];

    if (type === '1W') {
      tmpdata = AccountData.slice(0, 7).reverse(); // First 7 days
    }
    else if (type === "1M") {
      tmpdata = AccountData.slice(0, 30).reverse(); // All available data for 1Y
    }
    else if (type === "3M") {
        tmpdata = AccountData.slice(0, 90).reverse(); // All available data for 1Y
    }
    else if (type === "6M") {
        tmpdata = AccountData.slice(0, 180).reverse(); // All available data for 1Y
    }
    else if (type === "1Y") {
        tmpdata = AccountData.slice(0, 365).reverse(); // All available data for 1Y
    }
    else if (type === "ALL") {
        tmpdata = AccountData.reverse(); // All available data for 1Y
    }

    // Extract x and y data
    datax = tmpdata.map(item => item.date);
    datay = tmpdata.map(item => item.all_count);

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
                <div className="relative mx-4 flex flex-col justify-between gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
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
                            Daily Active Accounts
                        </h6>
                    </div>
                </div>
                <Divide />
                <div className='p-3'>
                    {(chartDataX.length > 0 && chartDataY.length > 0) &&  <BarChartAccount
                        chartDataX = {chartDataX}
                        chartDataY = {chartDataY}
                        chartID = {'DailyAccounts'}
                        color1 = {'#c7081e'}
                        color2 = {'#690c1b'}
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

export default DailyAccount;
