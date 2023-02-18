import React from "react";
import Chart from "react-apexcharts";

const labels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];

const data = [
    {
        name: "Credit score",
        data: [500, 550, 480, 510, 520, 550, 560],
    },
];

// type Props = {
//   series: { name: string; data: number[] }[];
//   height?: number;
//   width: number;
//   colors?: string[];
//   areaFormat?: boolean;
// };

const LineChart = ({
    height = "78%",
    width = "100%",
    series = data,
    colors = ["#0000ff", "#0000ff", "#0000ff"],
    areaFormat = false,
}) => {
    return (
        <Chart
            options={{
                chart: {
                    height: 350,
                    type: "line",
                    zoom: {
                        enabled: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "straight",
                },
                title: {
                    text: "Credit Score",
                    align: "left",
                },
                grid: {
                    row: {
                        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                        opacity: 0.5,
                    },
                },
                xaxis: {
                    categories: [
                        "May",
                        "Jun",
                        "Oct",
                        "Nov",
                        "Dec",
                        "Jan",
                        "Feb",
                    ],
                },
            }}
            series={series}
            type={areaFormat ? "area" : "line"}
            height={height}
            width={width}
        />
    );
};

export default LineChart;
