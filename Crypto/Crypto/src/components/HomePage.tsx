import millify from "millify"; // Converts big digits to shorthands i.e --> 10000 = 10k or 1024mb --> 1Gb
import { Typography, Row, Col, Statistic } from "antd"; // Tabele z ant desing
import { Link } from "react-router-dom";
import { useGetCoinsDataQuery } from "../services/coinApi";
import { Stats, Data } from "../services/types";
import { Cryptocurrencies, News } from "./ComponentsIndex";

const { Title } = Typography;
const HomePage = () => {
    const { data, isLoading } = useGetCoinsDataQuery(10);
    const globalStats = data?.data.stats;
    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div>
                <Title level={2} className="heading">
                    Global Crypto Stats
                </Title>
                <Row>
                    <Col span={12}>
                        <Statistic title="Total Cryptocurrencies" value={millify(globalStats?.total)}></Statistic>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}></Statistic>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Market Cup" value={millify(Number(globalStats.totalMarketCap))}></Statistic>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total 24h volume" value={millify(Number(globalStats.total24hVolume))}></Statistic>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}></Statistic>
                    </Col>
                </Row>
                <div className="home-heading-containter">
                    <Title level={3} className="home-title">
                        Top 10 Cryptocurrencies in the world
                    </Title>
                    <Title level={3} className="show-more">
                        <Link to="/cryptocurrencies">Show More</Link>
                    </Title>
                </div>
                <Cryptocurrencies simplified />
                <div className="home-heading-containter">
                    <Title level={3} className="home-title">
                        Latest Crypto News
                    </Title>
                    <Title level={3} className="show-more">
                        <Link to="/news">Show More</Link>
                    </Title>
                </div>
                <News simplified />
            </div>
        </>
    );
};

export default HomePage;
