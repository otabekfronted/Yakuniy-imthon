import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const LineChart = () => {
    const [chartData, setChartData] = useState({
        series: [
            {
                name: "Price (Past 1 Day)",
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
                categories: [], // Vaqt belgilarini API-dan to'ldiramiz
            },
            yaxis: {
                labels: {
                    formatter: (value) => `₹ ${value}`,
                },
            },
            tooltip: {
                y: {
                    formatter: (value) => `₹ ${value}`,
                },
            },
            colors: ["#00BFFF"],
            title: {
                text: "Price (Past 1 Day) in INR",
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

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(
                    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
                    {
                        params: {
                            vs_currency: "inr", // Valyuta
                            days: 1, // Oxirgi 1 kunlik ma'lumot
                        },
                    }
                );

                const prices = response.data.prices; // Narxlar ro'yxati [timestamp, price]
                const times = prices.map(
                    (price) => new Date(price[0]).toLocaleTimeString() // Timestampsni soat formatiga o'zgartirish
                );
                const priceValues = prices.map((price) => price[1]); // Narx qiymatlarini olish

                // State-ni yangilash
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
                    },
                }));
            } catch (error) {
                console.error("API ma'lumotlarini olishda xatolik:", error);
            }
        };

        fetchChartData();
    }, []);

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
