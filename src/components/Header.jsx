import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";

function Header() {
    const { currency, setCurrency } = useContext(CurrencyContext);

    return (
        <header className=" bg-[#000] shadow-md p-4">
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
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="JPY">JPY</option>
                    </select>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                        Watch List
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
