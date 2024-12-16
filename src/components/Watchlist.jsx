import { useState, useEffect, useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";

const Watchlist = ({ toggleWatchlist }) => {
    const { currency, convertPrice } = useContext(CurrencyContext);
    const [viewedCoins, setViewedCoins] = useState([]);

    useEffect(() => {
        const savedViewedCoins = localStorage.getItem("viewedCoins");
        if (savedViewedCoins) {
            setViewedCoins(JSON.parse(savedViewedCoins));
        }
    }, []);

    const removeFromWatchlist = (coinId) => {
        const updatedCoins = viewedCoins.filter((coin) => coin.id !== coinId);
        setViewedCoins(updatedCoins);
        localStorage.setItem("viewedCoins", JSON.stringify(updatedCoins));
    };

    return (
        <div className="fixed top-0 right-0 h-full w-[300px] bg-[#515151] text-white p-4 shadow-lg z-50">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Watchlist</h2>
                <button
                    className="text-white bg-red-500 px-2 py-1 rounded"
                    onClick={toggleWatchlist}
                >
                    Close
                </button>
            </div>

            {viewedCoins.length === 0 ? (
                <p>No coins in the watchlist</p>
            ) : (
                <>
                    <div
                        className="grid grid-cols-2 gap-4 overflow-y-auto"
                        style={{ maxHeight: "80vh" }}
                    >
                        {viewedCoins.map((coin) => (
                            <div
                                key={coin.id}
                                className="bg-[#14161A] text-center p-4 rounded-lg shadow-md"
                            >
                                <img
                                    src={coin.image}
                                    alt={coin.name}
                                    className="w-20 h-20 rounded-full mx-auto mb-4"
                                />
                                <p className="text-lg font-semibold mb-2">
                                    {convertPrice(coin.market_cap, currency)}
                                </p>

                                <button
                                    className="bg-red-500 px-4 py-2 text-white rounded mt-2"
                                    onClick={() => removeFromWatchlist(coin.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Watchlist;
