import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from "axios";

import { Card } from '../../ui/components/card';
import { Divide } from '../../ui/components/divide';

const BarChartMulti = dynamic(() => import('../../ui/chart/BarChartMulti'), {
    ssr: false,
});

const InOutFlow = () => {
    const [chain, setChain] = useState('ICP');
    const [TVLData, setTVLData] = useState([]);
    const [chartDataX, setChartDataX] = useState([]);
    const [chartDataY, setChartDataY] = useState([]);

    const getTVLData = (selectedChain) => {
        axios.get(`https://api.llama.fi/v2/historicalChainTvl/${selectedChain}`)
            .then((response) => {
                const monthlyData = Array.from({ length: 12 }, () => ({ inflow: 0, outflow: 0 }));
                const dailyData = response.data;

                for (let i = 1; i < dailyData.length; i++) {
                    const current = dailyData[i];
                    const previous = dailyData[i - 1];

                    const date = new Date(current.date * 1000);
                    const month = date.getMonth();

                    const difference = current.tvl - previous.tvl;

                    if (difference > 0) {
                        monthlyData[month] = {
                            ...monthlyData[month],
                            inflow: monthlyData[month].inflow + difference,
                        };
                    } else {
                        monthlyData[month] = {
                            ...monthlyData[month],
                            outflow: monthlyData[month].outflow + Math.abs(difference),
                        };
                    }
                }

                setTVLData(monthlyData);
            })
            .catch((error) => console.error("Error fetching TVL data:", error));
    };

    const handleChainChange = (event) => {
        const selectedChain = event.target.value;
        setChain(selectedChain);
        getTVLData(selectedChain);
    };

    useEffect(() => {
        if (TVLData.length > 0) {
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const inflow = TVLData.map((item) => Math.floor(item.inflow));
            const outflow = TVLData.map((item) => Math.floor(item.outflow));

            setChartDataX(months);
            setChartDataY([
                {
                    label: 'Inflow',
                    data: inflow,
                    backgroundColor: ['rgba(139,69,19,0.7)', 'rgba(210,180,140,0.7)'],
                    borderColor: ['rgba(160, 82, 45, 1)', 'rgba(210, 180, 140, 1)'],
                    borderWidth: 1,
                },
                {
                    label: 'Outflow',
                    data: outflow,
                    backgroundColor: ['rgba(255, 255, 255, 0.7)', 'rgba(245, 245, 245, 0.7)'],
                    borderColor: ['rgba(255, 255, 255, 1)', 'rgba(245, 245, 245, 1)'],
                    borderWidth: 1,
                },
            ]);
        }
    }, [TVLData]);

    useEffect(() => {
        getTVLData(chain);
    }, []);

    return (
        <div className="relative flex flex-col rounded-xl bg-[#1F2022] bg-clip-border text-gray-700 shadow-md">
            <Card>
                <div className="relative mx-4 flex flex-row justify-between items-center gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
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
                            Inflow / Outflow
                        </h6>
                    </div>
                    <div>
                        <select
                            className="rounded-md bg-[#21262B] py-1 px-3 text-sm text-[#505762] border border-gray-700"
                            value={chain}
                            onChange={handleChainChange}
                        >
                            <option value="ICP">ICP</option>
                            <option value="Bitcoin">Bitcoin</option>
                            <option value="Ethereum">Ethereum</option>
                            <option value="Solana">Solana</option>
                            <option value="Binance">Binance Smart Chain</option>
                            <option value="Ton">Ton</option>
                        </select>
                    </div>
                </div>
                <Divide />
                <div className='p-3'>
                    {(chartDataX.length > 0 && chartDataY.length > 0) && (
                        <BarChartMulti
                            chartDataX={chartDataX}
                            chartDataY={chartDataY}
                            chartID={'InOut'}
                        />
                    )}
                </div>
            </Card>
        </div>
    );
};

export default InOutFlow;
