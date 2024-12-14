import { useState, useEffect } from "react";

function HeroCarousel() {
    const [coins, setCoins] = useState([]); // API ma'lumotlari
    const [currentIndex, setCurrentIndex] = useState(0); // Hozirgi slayd

    useEffect(() => {
        // API dan ma'lumot olish
        const fetchCoins = async () => {
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
                );
                const data = await response.json();
                setCoins(data);
            } catch (error) {
                console.error("API xatosi:", error);
            }
        };

        fetchCoins();
    }, []);

    // Avtomatik slayd
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === coins.length - 4 ? 0 : prevIndex + 1
            );
        }, 3000); // 3 soniyada o'tadi

        return () => clearInterval(interval); // Tozalash
    }, [coins]);

    // Agar ma'lumotlar hali yuklanmagan bo'lsa
    if (coins.length === 0) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div
            style={{
                backgroundImage: "url('./bg.png')",
                backgroundSize: "cover",
            }}
        >
            <div className="container  mx-auto overflow-hidden relative rounded-lg">
                <h2 className="text-[#87CEEB] pt-16 font-montserrat text-[60px] font-bold leading-[72px] tracking-[-0.5px] text-center ">
                    CRYPTOFOLIO WATCH LIST
                </h2>
                <p className="text-[#A9A9A9] text-center font-medium">
                    Get all the Info regarding your favorite Crypto Currency
                </p>
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${currentIndex * 25}%)`, // 4 ta element uchun 25%
                    }}
                >
                    {coins.map((coin) => (
                        <div
                            key={coin.id}
                            className="flex-shrink-0 flex-grow-0 basis-1/4 max-w-[25%] h-64 flex items-center justify-center text-white p-4 rounded-lg  "
                        >
                            <div className="flex flex-col items-center justify-center w-full">
                                <img
                                    src={coin.image}
                                    alt={coin.name}
                                    className="h-20 mb-4 rounded-full border-4 border-white"
                                />
                                <div className="flex gap-3 items-center justify-between">
                                    <h2 className="text-xl font-semibold">
                                        {coin.symbol.toUpperCase()}
                                    </h2>
                                    <p
                                        className={` text-xl ${
                                            coin.price_change_percentage_24h > 0
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        {coin.price_change_percentage_24h > 0
                                            ? "+"
                                            : ""}
                                        {coin.price_change_percentage_24h.toFixed(
                                            2
                                        )}
                                        %
                                    </p>
                                </div>
                                <p className="text-xl">{coin.current_price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HeroCarousel;