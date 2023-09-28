import { useState } from "react";
import { useParams } from "react-router-dom";
import CryptoChart from "./CryptoChart";
import HTMLReactParser from "html-react-parser"; // Parsuje string z tagami HTML'a do elementu Reacta
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckOutlined,
    NumberOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons";
import { useGetCoinDetailsQuery, useGetCoinPriceHistoryQuery } from "../services/coinApi";

//! Types

type IdParam = {
    coinId: string;
};

const { Text, Title } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams<IdParam>();
    const [period, setPeriod] = useState<string>("7d");

    const { data, isLoading } = useGetCoinDetailsQuery(coinId as string);
    const { data: coinPriceHistory } = useGetCoinPriceHistoryQuery({ id: coinId as string, timePeriod: period });

    const coinData = data?.data?.coin;
    const historyData = coinPriceHistory?.data?.history;

    console.log(historyData);
    const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

    const stats = [
        { title: "Price to USD", value: `$ ${coinData?.price && millify(Number(coinData?.price))}`, icon: <DollarCircleOutlined /> },
        { title: "Rank", value: coinData?.rank, icon: <NumberOutlined /> },
        { title: "24h Volume", value: `$ ${coinData?.["24hVolume"] && millify(Number(coinData?.["24hVolume"]))}`, icon: <ThunderboltOutlined /> },
        { title: "Market Cap", value: `$ ${coinData?.marketCap && millify(Number(coinData?.marketCap))}`, icon: <DollarCircleOutlined /> },
        {
            title: "All-time-high(daily avg.)",
            value: `$ ${coinData?.allTimeHigh?.price && millify(Number(coinData?.allTimeHigh?.price))}`,
            icon: <TrophyOutlined />,
        },
    ];

    const genericStats = [
        { title: "Number Of Markets", value: coinData?.numberOfMarkets, icon: <FundOutlined /> },
        { title: "Number Of Exchanges", value: coinData?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        {
            title: "Aprroved Supply",
            value: coinData?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Total Supply",
            value: `$ ${coinData?.supply?.total && millify(Number(coinData?.supply?.total))}`,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Circulating Supply",
            value: `$ ${coinData?.supply?.circulating && millify(Number(coinData?.supply?.circulating))}`,
            icon: <ExclamationCircleOutlined />,
        },
    ];

    if (isLoading) return <h3>Loading data...</h3>;
    if (historyData && coinData?.price && coinData?.name)
        return (
            <Col className="coin-detail-container">
                <Col className="coin-heading-container">
                    <Title level={2}>
                        {coinData?.name} ({coinData?.symbol}) Price
                    </Title>
                    <Text>{coinData?.name} live price in US dollars. View value statistic, market cap and uspply </Text>
                </Col>
                <Select className="select-timeperiod" defaultValue={"7d"} placeholder="Price Timeperiod" onChange={(value) => setPeriod(value)}>
                    {time.map((period, index) => (
                        <Option value={period} key={index}>
                            {period}
                        </Option>
                    ))}
                </Select>
                <CryptoChart coinHistory={historyData} currentPrice={coinData?.price} name={coinData?.name} />
                <Col className="stats-container">
                    <Col className="coin-value-stats">
                        <Col className="coin-value-heading">
                            <Title level={3}>{coinData?.name} Value Statistic</Title>
                            <Text>An overview showing the stats of {coinData?.name}</Text>
                        </Col>
                        {stats.map(({ title, value, icon }) => (
                            <Col className="coin-stats" key={value}>
                                <Col className="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className="coin-stats-value">
                                    <b>{value}</b>
                                </Text>
                            </Col>
                        ))}
                    </Col>
                    <Col className="coin-other-stats">
                        <Col className="coin-value-heading">
                            <Title level={3}>Other Statistic</Title>
                            <Text>An overview showing the stats of all cryptocurrencies</Text>
                        </Col>
                        {genericStats.map(({ title, value, icon }) => (
                            <Col className="coin-stats" key={title}>
                                <Col className="coin-stats-name">
                                    <Text>{icon}</Text>
                                    <Text>{title}</Text>
                                </Col>
                                <Text className="coin-stats-value">
                                    <b>{value}</b>
                                </Text>
                            </Col>
                        ))}
                    </Col>
                </Col>
                <Col className="coin-description">
                    <Col className="coin-description-heading">
                        <Title level={3}>What is {coinData?.name}?</Title>
                        <Text>{coinData?.description}</Text>
                    </Col>
                    <Col className="coin-description-links">
                        <Title level={3}>Links</Title>
                        {coinData?.links.map(({ name, url }: { name: string; url: string }) => (
                            <Row className="coin-link" key={name}>
                                <Title level={5} className="link-name">
                                    {name}
                                </Title>
                                <a className="link-url" href={url}>
                                    {url}
                                </a>
                            </Row>
                        ))}
                    </Col>
                </Col>
            </Col>
        );
};

export default CryptoDetails;
