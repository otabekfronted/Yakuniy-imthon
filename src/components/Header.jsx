import { useContext, useState } from "react";
import { CurrencyContext } from "../context/CurrencyContext";
import Watchlist from "./Watchlist";

function Header() {
    const { currency, setCurrency } = useContext(CurrencyContext);
    const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);

    const toggleWatchlist = () => {
        setIsWatchlistOpen((prev) => !prev);
    };

    return (
        <header className="bg-[#000] shadow-md p-4">
            <div className="flex container mx-auto justify-between items-center">
                <h1 className="text-[#87CEEB] cursor-pointer text-2xl font-bold">
                    CRYPTOFOLIO
                </h1>
                <div className="flex gap-4 items-center">
                    <select
                        className="font-roboto text-base font-normal leading-5 tracking-[0.15px] text-left underline-offset-auto decoration-slice bg-[#000] text-white"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                        <option value="jpy">JPY</option>
                    </select>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                        onClick={toggleWatchlist}
                    >
                        Watch List
                    </button>
                </div>
            </div>

            {isWatchlistOpen && <Watchlist toggleWatchlist={toggleWatchlist} />}
        </header>
    );
}

export default Header;
