/* eslint-disable @next/next/no-img-element */
// Next, React
// import dynamic from 'next/dynamic';
import { RiBtcFill } from "react-icons/ri";
import { FaEthereum } from "react-icons/fa";
import Head from "next/head"
import styles from "../ui/styles/Home.module.css"
import { Card } from "../ui/components/card";
import { Section } from "../ui/components/section";
import { Divide } from "../ui/components/divide";
import TvlHistory from "./Dashboard/TVLHistory";
import PieChart from "../ui/chart/PieChart";
import LendingTable from "../app/components/LendingTable";
import AssetManagement from "./Dashboard/AssetManagement";
// import DataShow from "./Dashboard/DataShow";
import Map from "../ui/map/map";  // Import the Map component
import InOutFlow from "./Dashboard/InOutFlow";
import DailyAccount from "./Dashboard/DailyAccount";

// const BarChart = dynamic(() => import('../ui/chart/BarChart'), {
//   ssr: false, // Disable server-side rendering
// });

function HomePage() {

  const nodes = [
    { id: 1, name: "Node 1", lat: 40.7128, lng: -74.0060, info: "Details for Node 1" },
    { id: 2, name: "Node 2", lat: 34.0522, lng: -118.2437, info: "Details for Node 2" },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Internet Computer</title>
      </Head>
      <main className={styles.main}>
        {/* Pass nodes data to the Map component */}
        <Map nodes={nodes} />
        <Section>
          <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-3">
                <Card>
                  Asset Composition
                  <Divide />
                  <div className="flex justify-center p-8">
                    <PieChart
                      width= {200}
                      height= {200}
                    />
                  </div>
                  <Divide />
                  <div className="p-4">
                    <div className="text-[#67707E] text-base">
                      Portfolio
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-[#EEEEEE] text-sm">
                        Value
                      </div>
                      <div className="text-[#EEEEEE] text-sm">
                        $ 4,026,227
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-[#EEEEEE] text-sm">
                        ROI
                      </div>
                      <div className="text-[#3cad88] text-sm">
                        27.6%
                      </div>
                    </div>
                  </div>
                  <Divide />
                  <div className="p-4">
                    <div className="text-[#67707E] text-base">
                    My Liquidity Distribution
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex text-[#EEEEEE] text-sm">
                        <RiBtcFill size={24} className="text-base text-[#F3BA2F]" />
                        BTC 50%
                      </div>
                      <div className="text-[#EEEEEE] text-sm">
                        $ 4,026,227
                      </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex text-[#EEEEEE] text-sm">
                        <FaEthereum size={24} className="text-base text-[#4ECCA3]" />
                        ETH 50%
                      </div>
                      <div className="text-[#EEEEEE] text-sm">
                      $ 4,026,227
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center p-2">
                    <PieChart
                      width= {150}
                      height= {150}
                    />
                  </div>
                </Card>
              </div>
              <div className="col-span-12 lg:col-span-9">
                <div className="p-2">
                  <TvlHistory
                  />
                </div>
                <div className="p-2">
                  <AssetManagement />
                </div>
              </div>
          </div>
        </Section>
        <Section>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6">
              <InOutFlow/>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <DailyAccount/>
            </div>
          </div>
        </Section>
        <Section>
          <div className="col-span-12">
            <div className="p-2">
                <LendingTable/>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}

export default HomePage;
