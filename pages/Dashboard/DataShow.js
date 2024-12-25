import React from 'react';
import dynamic from 'next/dynamic';

import { WhiteCard } from '../../ui/components/whiteCard';
import { Divide } from '../../ui/components/divide';

const BarChart = dynamic(() => import('../../ui/chart/BarChart'), {
  ssr: false, // Disable server-side rendering
});

const DataShow = () => {
    
    return (
        <div className="relative flex flex-col rounded-xl bg-clip-border text-gray-700 shadow-md">
            <WhiteCard>
                <div className="relative mx-4 mt-4 flex flex-col justify-between gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
                    <div className="flex gap-2 w-max rounded-lg bg-gray-900 p-5 text-white">
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
                    <BarChart
                        // formattedTVLData = {props.formattedTVLData}
                        chartID = {'TVL'}
                        color1 = {'#1ABC7B'}
                        color2 = {'#0C5638'}
                    />
                </div>
                <div>
                    <div class="row flex">
                        <button class="rounded-md rounded-r-none bg-[#21262B] py-0 px-3 mx-0 border border-transparent text-center text-sm text-[#505762] transition-all shadow-sm hover:shadow focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            1H
                        </button>
                        <button class="rounded-none bg-[#21262B] py-0 px-3 mx-0 border-l border-r border-slate-700 text-center text-sm text-[#505762] transition-all shadow-md hover:shadow-lg focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            1D
                        </button>
                        <button class="rounded-none bg-[#21262B] py-0 px-3 mx-0 border-l border-r border-slate-700 text-center text-sm text-[#505762] transition-all shadow-md hover:shadow-lg focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            1W
                        </button>
                        <button class="rounded-none bg-[#21262B] py-0 px-3 mx-0 border-l border-r border-slate-700 text-center text-sm text-[#505762] transition-all shadow-md hover:shadow-lg focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            1M
                        </button>
                        <button class="rounded-none bg-[#21262B] py-0 px-3 mx-0 border-l border-r border-slate-700 text-center text-sm text-[#505762] transition-all shadow-md hover:shadow-lg focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            3M
                        </button>
                        <button class="rounded-none bg-[#21262B] py-0 px-3 mx-0 border-l border-r border-slate-700 text-center text-sm text-[#505762] transition-all shadow-md hover:shadow-lg focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            6M
                        </button>
                        <button class="rounded-none bg-[#21262B] py-0 px-3 mx-0 border-l border-r border-slate-700 text-center text-sm text-[#505762] transition-all shadow-md hover:shadow-lg focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            1Y
                        </button>
                        <button class="rounded-md rounded-l-none bg-[#21262B] py-0 px-3 mx-0 border border-transparent text-center text-sm text-[#505762] transition-all shadow-sm hover:shadow focus:bg-[#4ECCA3] focus:shadow-none active:bg-[#4ECCA3] hover:bg-[#4ECCA3] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                            All
                        </button>
                    </div>
                </div>
            </WhiteCard>
        </div>
    );
};

export default DataShow;
