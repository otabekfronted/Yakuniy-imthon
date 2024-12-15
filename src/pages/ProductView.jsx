import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LineChart from "../components/LineChart";

const ProductView = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedTime, setSelectedTime] = useState("24 Hours");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/${id}`
                );
                setData(response.data);
            } catch (error) {
                console.error("API chaqiruvda xatolik:", error);
                setError("Ma'lumotlarni yuklashda muammo yuz berdi.");
            }
        };

        fetchData();
    }, [id]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!data) {
        return <p className="text-gray-400">Yuklanmoqda...</p>;
    }

    return (
        <div className="bg-[#14161A] flex flex-col lg:flex-row text-white p-6 gap-6">
            {/* Chap tomon ma'lumotlar */}
            <div className="w-full lg:w-[450px] flex-shrink-0">
                <div className="flex flex-col items-center">
                    <img
                        src={data.image.large}
                        className="w-48 h-48 mb-5"
                        alt={`${data.name} logo`}
                    />
                    <h1 className="text-3xl text-center font-montserrat text-[48px] font-bold mb-5">
                        {data.name}
                    </h1>
                </div>
                <div>
                    <p className="font-montserrat text-[16px] font-normal leading-[28px] text-left mb-4">
                        {data.description.en.slice(0, 200)}...
                    </p>
                    <p className="text-2xl font-bold mb-2">
                        Rank: {data.market_cap_rank}
                    </p>
                    <p className="text-2xl font-bold mb-2">
                        Current Price: ₹ {data.market_data.current_price.inr}
                    </p>
                    <p className="text-2xl font-bold">
                        Market Cap: ₹{" "}
                        {data.market_data.market_cap.inr.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* LineChart qismi */}
            <div className="flex-grow bg-[#1C1E22] rounded-lg p-4 shadow-md">
                <div className="h-[400px]">
                    <LineChart timePeriod={selectedTime} />
                </div>
                {/* Tugmalar qismi */}
                <div className="flex justify-around mt-6">
                    {["24 Hours", "30 Days", "3 Months", "1 Year"].map(
                        (time, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedTime(time)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold ${
                                    selectedTime === time
                                        ? "bg-blue-500 text-white"
                                        : "bg-[#26292E] text-gray-300 hover:bg-gray-700"
                                }`}
                            >
                                {time}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductView;
