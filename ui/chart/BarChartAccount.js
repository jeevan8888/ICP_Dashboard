import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

const BarChartAccount = (props) => {

  const [ dataX , setDataX ] = useState(props.chartDataX)
  const [ dataY , setDataY ] = useState(props.chartDataY)

  useEffect(() => {
    setDataX(props.chartDataX)
    setDataY(props.chartDataY)

  }, [props.chartDataX, props.chartDataY])

  console.log(props.chartDataX)
  console.log(props.chartDataY)

  useEffect(() => {
    const chartID = props.chartID || "default-chart-id";

    const chartConfig = {
      series: [
        {
          name: "Active Accounts",
          data: dataY,
          // data: [50, 40, 300, 320, 1100, 230, 500, 600, 900],
        },
      ],
      chart: {
        type: "bar",
        height: 240,
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: [props.color1],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: dataX,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: false,
        borderColor: props.color2,
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal", // Gradient direction: horizontal, vertical, diagonal, etc.
          shadeIntensity: 0.5,
          gradientToColors: [props.color2], // Second color
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      tooltip: {
        theme: "dark",
      },
    };

    // Initialize chart
    const chart = new ApexCharts(
      document.querySelector(`#bar-chart-${chartID}`),
      chartConfig
    );
    chart.render();

    // Cleanup chart on component unmount
    return () => {
      chart.destroy();
    };
  }, [props.chartID, dataX, dataY]); // Re-render only if chartID changes

  return (
    <div className="relative flex flex-col rounded-xl bg-[#1F2022] bg-clip-border text-gray-700">
      <div className="pt-6 px-2 pb-0">
        <div id={`bar-chart-${props.chartID || "default-chart-id"}`}></div>
      </div>
    </div>
  );
};

export default BarChartAccount;
