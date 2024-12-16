import { createContext, useState } from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState("usd");

    const convertPrice = (price, currency) => {
        const rates = {
            usd: 1,
            eur: 0.85,
            jpy: 110,
        };
        return (
            (price * rates[currency]).toFixed(2) + " " + currency.toUpperCase()
        );
    };

    return (
        <CurrencyContext.Provider
            value={{ currency, setCurrency, convertPrice }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};
