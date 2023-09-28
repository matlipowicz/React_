import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import { Navbar, HomePage, Cryptocurrencies, Exchanges, News, CryptoDetails } from "./components/ComponentsIndex";
import "./App.css";

export const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <nav className="navbar">
                    <Navbar />
                </nav>
                <main className="main">
                    <Layout>
                        <div className="routes">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
                                <Route path="/exchanges" element={<Exchanges />} />
                                <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                                <Route path="/news" element={<News />} />
                            </Routes>
                        </div>
                    </Layout>
                    <footer className="footer">
                        <Typography.Title level={5} style={{ color: "#fff", textAlign: "center" }}>
                            CryptoGenki
                            <br />
                            All rights reserved
                        </Typography.Title>
                        <Space>
                            <Link to="/">Home</Link>
                            <Link to="/exchanges">Exchanges</Link>
                            <Link to="/news">News</Link>
                        </Space>
                    </footer>
                </main>
            </div>
        </BrowserRouter>
    );
};
