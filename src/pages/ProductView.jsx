import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LineChart from "../components/LineChart";

const ProductView = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

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
        <div className="bg-[#14161A] text-white p-6">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="mt-4 text-lg">Symbol: {data.symbol.toUpperCase()}</p>
            <p className="text-lg">Market Cap Rank: {data.market_cap_rank}</p>
            <p className="text-lg">
                Current Price: ₹ {data.market_data.current_price.inr}
            </p>
            <p className="mt-4 text-gray-300">
                {data.description.en.slice(0, 200)}...
            </p>
            <LineChart />
        </div>
    );
};

export default ProductView;
