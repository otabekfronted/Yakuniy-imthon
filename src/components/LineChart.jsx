import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { useParams } from "react-router-dom";

const LineChart = ({ timePeriod }) => {
    const { id } = useParams(); // useParams orqali idni olish
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
            },
            stroke: {
                curve: "smooth",
            },
            xaxis: {
                categories: [],
            },
            yaxis: {
                labels: {
                    formatter: (value) => `$ ${value.toFixed(2)}`,
                },
            },
            tooltip: {
                y: {
                    formatter: (value) => `$ ${value.toFixed(2)}`,
                },
            },
            colors: ["#00BFFF"],
            title: {
                text: `Price in USD (${timePeriod})`,
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
                    `https://api.coingecko.com/api/v3/coins/${id}/market_chart`, // To'g'ri URL
                    {
                        params: {
                            vs_currency: "usd", // USD valyutasi uchun
                            days: timeMapping[timePeriod],
                        },
                    }
                );

                const prices = response.data.prices; // Narx va vaqt [timestamp, price]
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
                            text: `Price in USD (${timePeriod})`,
                        },
                    },
                }));
            } catch (error) {
                console.error("API ma'lumotlarini olishda xatolik:", error);
            }
        };

        fetchChartData();
    }, [timePeriod, id]); // ID o'zgarishini kuzatish uchun

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
