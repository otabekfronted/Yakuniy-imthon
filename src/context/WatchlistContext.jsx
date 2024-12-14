import { createContext, useState, useEffect } from "react";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem("watchlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    return (
        <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};
