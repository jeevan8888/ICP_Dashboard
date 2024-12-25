import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

const BarChartMulti = (props) => {
  const [dataX, setDataX] = useState(props.chartDataX);
  const [dataY, setDataY] = useState(props.chartDataY);

  useEffect(() => {
    setDataX(props.chartDataX);
    setDataY(props.chartDataY);
  }, [props.chartDataX, props.chartDataY]);

  useEffect(() => {
    const chartID = props.chartID || "default-chart-id";

    const chartConfig = {
      series: dataY.map((series) => ({
        name: series.label,
        data: series.data,
      })),
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
      colors: dataY.map((series) => series.backgroundColor),
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
  }, [props.chartID, dataX, dataY]);

  return (
    <div className="relative flex flex-col rounded-xl bg-[#1F2022] bg-clip-border text-gray-700">
      <div className="pt-6 px-2 pb-0">
        <div id={`bar-chart-${props.chartID || "default-chart-id"}`}></div>
      </div>
    </div>
  );
};

export default BarChartMulti;
