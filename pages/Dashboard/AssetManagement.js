import React from 'react';

import { Card } from '../../ui/components/card';
import { Divide } from '../../ui/components/divide';



const AssetManagement = () => {

    return (
        <div className="relative flex flex-col rounded-xl bg-[#1F2022] bg-clip-border text-gray-700 shadow-md">
            <Card>
                <div className="relative mx-4 mt-4 flex flex-col justify-between gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
                    <div>
                        <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-[#67707E] antialiased">
                            Position
                        </h6>
                    </div>
                    <div>
                        <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-[#67707E] antialiased">
                            Assets Under Management
                        </h6>
                    </div>
                    <div>
                        <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-[#67707E] antialiased">
                            ROI
                        </h6>
                    </div>
                </div>
                <Divide />
                <div className="flex flex-row justify-between items-center p-4">
                    <div className="text-[#EEEEEE] text-base">
                    BTC - ETH
                    </div>
                    <div className="text-[#EEEEEE] text-base">
                    $63,383,025.70
                    </div>
                    <div className="text-[#3cad88] text-base">
                    27.6%
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AssetManagement;
