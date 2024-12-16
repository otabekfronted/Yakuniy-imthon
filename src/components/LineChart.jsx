import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { CurrencyContext } from "../context/CurrencyContext";

const LineChart = ({ timePeriod }) => {
    const { id } = useParams();
    const { currency } = useContext(CurrencyContext);
    const [chartData, setChartData] = useState({
        series: [
            {
                name: "Price",
                data: [],
            },
        ],
        options: {
            chart: {
                type: "line",
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                curve: "smooth",
            },
            xaxis: {
                categories: [],
            },
            yaxis: {
                labels: {
                    formatter: (value) =>
                        `${currency.toUpperCase()} ${value.toFixed(2)}`,
                },
            },
            tooltip: {
                y: {
                    formatter: (value) =>
                        `${currency.toUpperCase()} ${value.toFixed(2)}`,
                },
            },
            colors: ["#00BFFF"],
            title: {
                text: `Price in ${currency.toUpperCase()} (${timePeriod})`,
                align: "left",
                style: {
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#fff",
                },
            },
            grid: {
                borderColor: "#515151",
            },
            theme: {
                mode: "dark",
            },
        },
    });

    const timeMapping = {
        "24 Hours": 1,
        "30 Days": 30,
        "3 Months": 90,
        "1 Year": 365,
    };

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
                    {
                        params: {
                            vs_currency: currency,
                            days: timeMapping[timePeriod],
                        },
                    }
                );

                const prices = response.data.prices;
                const times = prices.map(
                    (price) =>
                        new Date(price[0]).toLocaleDateString() +
                        " " +
                        new Date(price[0]).toLocaleTimeString()
                );
                const priceValues = prices.map((price) => price[1]);

                setChartData((prevData) => ({
                    ...prevData,
                    series: [
                        {
                            ...prevData.series[0],
                            data: priceValues,
                        },
                    ],
                    options: {
                        ...prevData.options,
                        xaxis: {
                            ...prevData.options.xaxis,
                            categories: times,
                        },
                        title: {
                            ...prevData.options.title,
                            text: `Price in ${currency.toUpperCase()} (${timePeriod})`,
                        },
                        yaxis: {
                            ...prevData.options.yaxis,
                            labels: {
                                formatter: (value) =>
                                    `${currency.toUpperCase()} ${value.toFixed(
                                        2
                                    )}`,
                            },
                        },
                        tooltip: {
                            y: {
                                formatter: (value) =>
                                    `${currency.toUpperCase()} ${value.toFixed(
                                        2
                                    )}`,
                            },
                        },
                    },
                }));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchChartData();
    }, [timePeriod, id, currency]);

    return (
        <div className="bg-[#14161A] p-6">
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
            />
        </div>
    );
};

export default LineChart;
