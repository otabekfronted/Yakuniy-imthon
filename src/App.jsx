import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "./context/CurrencyContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import Home from "./pages/Home";
import Header from "./components/Header";
import ProductView from "./pages/ProductView";

function App() {
    return (
        <CurrencyProvider>
            <WatchlistProvider>
                <Router>
                    <Header></Header>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/product/:id" element={<ProductView />} />
                    </Routes>
                </Router>
            </WatchlistProvider>
        </CurrencyProvider>
    );
}

export default App;
