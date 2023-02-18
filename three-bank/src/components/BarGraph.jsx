import React from "react";
import ReactApexChart from "react-apexcharts";

const labels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];

// type Props = {
//   series: { name: string; data: number[] }[];
//   height?: number;
//   width: number;
//   colors?: string[];
//   areaFormat?: boolean;
// };

const data = {
    series: [
        {
            name: "Your Expenses",
            data: [100, 80, 60, 50, 120, 90],
        },
    ],
    options: {
        chart: {
            type: "bar",
            height: 200,
        },
        annotations: {
            xaxis: [
                {
                    borderColor: "#00E396",
                    label: {
                        borderColor: "#00E396",
                        style: {
                            color: "#fff",
                            background: "#00E396",
                        },
                    },
                },
            ],
            yaxis: [
                {
                    y: "July",
                    y2: "September",
                },
            ],
        },
        xaxis: {
            categories: [
                "August",
                "September",
                "October",
                "November",
                "December",
                "Jan",
                "Feb",
            ],
        },
        grid: {
            xaxis: {
                lines: {
                    show: true,
                },
            },
        },
        yaxis: {
            axisTicks: {
                show: true,
            },
        },
    },
};

const BarGraph = ({
    height = "60%",
    width = "100%",
    series = data,
    colors = ["#0000ff", "#0000ff", "#0000ff"],
    areaFormat = false,
}) => {
    return (
        <ReactApexChart
            options={data.options}
            series={data.series}
            width={width}
            type="bar"
        />
    );
};

export default BarGraph;
