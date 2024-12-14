import React, { useState, useEffect, useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";
import axios from "axios";
import Pagination from "../components/Pagination";

const Home = () => {
    const { currency } = useContext(CurrencyContext);
    const [coins, setCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
                );
                setCoins(response.data);
            } catch (error) {
                console.error("Error fetching coins:", error);
            }
        };

        fetchCoins();
    }, [currency]);

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-[#14161A]">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Cryptocurrency Prices ({currency})
                </h1>

                <input
                    type="text"
                    placeholder="Search for a cryptocurrency..."
                    className="w-full p-2 bg-black text-white border border-gray-100 rounded-lg mb-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <table className="w-full bg-[#16171A] text-white">
                    <thead>
                        <tr className="bg-[#87CEEB] text-[#000] h-14">
                            <th className="text-left border-b border-[#515151] p-2 rounded-tl-md">
                                Coin
                            </th>
                            <th className="text-right border-b border-[#515151] p-2">
                                Price
                            </th>
                            <th className="text-right border-b border-[#515151] p-2">
                                24h Change
                            </th>
                            <th className="text-right border-b border-[#515151] p-2 rounded-tr-md">
                                Market Cap
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCoins.map((coin) => (
                            <tr key={coin.id}>
                                <td className="flex gap-3 border-b border-[#515151] p-3">
                                    <img
                                        className="w-[50px] h-[50px]"
                                        src={coin.image}
                                        alt={coin.name}
                                    />
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-bold">
                                            {coin.symbol.toUpperCase()}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {coin.name}
                                        </p>
                                    </div>
                                </td>
                                <td className="text-right border-b border-[#515151] p-2">
                                    ${coin.current_price}
                                </td>
                                <td
                                    className={`text-right border-b border-[#515151] p-2 ${
                                        coin.price_change_percentage_24h > 0
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {coin.price_change_percentage_24h.toFixed(
                                        2
                                    )}
                                    %
                                </td>
                                <td className="text-right border-b border-[#515151] p-2">
                                    {coin.total_volume}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
