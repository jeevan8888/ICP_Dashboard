import dynamic from "next/dynamic";

// Dynamically import react-apexcharts with SSR disabled
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Typography, Button  } from "@material-tailwind/react";
const chartConfig = {
  series: [44, 55],
  options: {
    chart: {
      type: "pie",
      toolbar: {
        show: false,
      },
    },
    title: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#1e88e5", "#00897b"],
    legend: {
      show: false,
    },
  },
};

export default function PieChart(props) {
  return (
    <div>
      <Chart
        options={chartConfig.options}
        series={chartConfig.series}
        type="pie"
        width={props.width}
        height={props.height}
      />
       <div className="flex flex-row justify-between" >
          <div className="flex items-center">
            <Button className="bg-[#00897b] w-8 h-2"></Button>
            <Typography>BTC</Typography>
          </div>
          <div className="flex items-center">
            <Button className="bg-[#1e88e5] w-8 h-2"></Button>
            <Typography>ETH</Typography>
          </div>
        </div>
    </div>
  );
}
