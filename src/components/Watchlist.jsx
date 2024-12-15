import { useEffect, useState } from "react";
const Watchlist = ({ toggleWatchlist }) => {
    const [viewedCoins, setViewedCoins] = useState([]);

    // LocalStorage-dan viewedCoins ro'yxatini olish
    useEffect(() => {
        const savedViewedCoins = localStorage.getItem("viewedCoins");
        if (savedViewedCoins) {
            setViewedCoins(JSON.parse(savedViewedCoins)); // JSON formatini arrayga o'zgartirish
        }
    }, []);

    // Tangani watchlistdan o'chirish funksiyasi
    const removeFromWatchlist = (coinId) => {
        const updatedCoins = viewedCoins.filter((coin) => coin.id !== coinId);
        setViewedCoins(updatedCoins);
        localStorage.setItem("viewedCoins", JSON.stringify(updatedCoins)); // O'chirilgandan keyin yangilash
    };

    return (
        <div className="fixed top-0 right-0 h-full w-[400px] bg-[#515151] text-white p-4 shadow-lg z-50">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Watchlist</h2>
                <button
                    className="text-white bg-red-500 px-2 py-1 rounded"
                    onClick={toggleWatchlist} // Close watchlist modal
                >
                    Close
                </button>
            </div>

            {/* Tangalar ro'yxati */}
            {viewedCoins.length === 0 ? (
                <p>No coins in the watchlist</p>
            ) : (
                // Scrollable container
                <div
                    className="grid grid-cols-2 gap-4 overflow-y-auto"
                    style={{ maxHeight: "80vh" }} // Modalning 80% balandligiga scroll beriladi
                >
                    {viewedCoins.map((coin) => (
                        <div
                            key={coin.id}
                            className="bg-[#14161A] text-center p-4 rounded-lg shadow-md"
                        >
                            {/* Tanganing rasmi */}
                            <img
                                src={coin.image}
                                alt={coin.name}
                                className="w-20 h-20 rounded-full mx-auto mb-4"
                            />
                            {/* Narxi */}
                            <p className="text-lg font-semibold mb-2">
                                {coin.total_volume.toLocaleString()}
                            </p>
                            {/* O'chirish tugmasi */}
                            <button
                                className="bg-red-500 px-4 py-2 text-white rounded"
                                onClick={() => removeFromWatchlist(coin.id)} // Remove coin from watchlist
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;
