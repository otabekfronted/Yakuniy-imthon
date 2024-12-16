import { useState, useEffect, useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";
import axios from "axios";
import Pagination from "../components/Pagination";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import HeroCarousel from "../components/HeroCarousel";

const Home = () => {
    const { currency } = useContext(CurrencyContext);
    const [coins, setCoins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [params, setParams] = useSearchParams();
    const [limit, setLimit] = useState(10);
    const navigate = useNavigate();

    const [viewedCoins, setViewedCoins] = useState(() => {
        const savedViewedCoins = localStorage.getItem("viewedCoins");
        return savedViewedCoins ? JSON.parse(savedViewedCoins) : [];
    });

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/markets`,
                    {
                        params: {
                            vs_currency: currency,
                            order: "gecko_desc",
                            per_page: limit,
                            page: page,
                            sparkline: false,
                            price_change_percentage: "24h",
                        },
                    }
                );
                setCoins(response.data);
                setParams({ page: page, currency: currency, limit: limit });
            } catch (error) {
                console.error("Error fetching coins:", error);
            }
        };

        fetchCoins();
    }, [currency, page, limit, setParams]);

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRowClick = (coinId) => {
        const selectedCoin = coins.find((coin) => coin.id === coinId);
        if (selectedCoin) {
            const updatedViewedCoins = [...viewedCoins, selectedCoin];
            setViewedCoins(updatedViewedCoins);
            localStorage.setItem(
                "viewedCoins",
                JSON.stringify(updatedViewedCoins)
            );
        }
        navigate(`/coin/${coinId}`);
    };

    return (
        <div className="bg-[#14161A]">
            <HeroCarousel />
            <div className="container mx-auto p-4">
                <h1 className="font-montserrat text-[34px] font-normal leading-[41.99px] tracking-[0.25px] text-center mb-3 text-white">
                    Cryptocurrency Prices by Market Cap ({currency})
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
                        {filteredCoins.map((coin) => {
                            const isViewed = viewedCoins.some(
                                (viewedCoin) => viewedCoin.id === coin.id
                            );

                            return (
                                <tr
                                    key={coin.id}
                                    className="cursor-pointer hover:bg-[#2A2B2D]"
                                    onClick={() => handleRowClick(coin.id)}
                                >
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
                                        <div className="flex items-center justify-end gap-4">
                                            <AiOutlineEye
                                                className={`${
                                                    isViewed
                                                        ? "text-green-500"
                                                        : "text-white"
                                                } w-[26px] h-8`}
                                            />
                                            <span>
                                                {coin.price_change_percentage_24h >
                                                0
                                                    ? "+"
                                                    : ""}
                                                {coin.price_change_percentage_24h.toFixed(
                                                    2
                                                )}
                                                %
                                            </span>
                                        </div>
                                    </td>
                                    <td className="text-right border-b border-[#515151] p-2">
                                        {coin.total_volume}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <Pagination
                    activeClassName="bg-[#87CEEB] text-[#000] py-2 px-5 rounded-full"
                    currentPage={page}
                    setPage={setPage}
                />
            </div>
        </div>
    );
};

export default Home;
