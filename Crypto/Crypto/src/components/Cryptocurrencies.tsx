import { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCoinsDataQuery } from "../services/coinApi";
import { Coin } from "../services/types";

const Cryptocurrencies = ({ simplified }: { simplified?: boolean }) => {
    const count = simplified ? 10 : 100;

    const { data: cryptoList, isFetching } = useGetCoinsDataQuery(count);
    const [crypto, setCrypto] = useState<Coin[] | undefined>([]);
    const [searchCrypto, setSearchCrypto] = useState("");

    const filterCrypto = cryptoList?.data.coins.filter((coin: Coin) => coin.name.toLowerCase().includes(searchCrypto.toLocaleLowerCase()));
    useEffect(() => {
        setCrypto(filterCrypto);
    }, [cryptoList, searchCrypto]);

    if (isFetching) return <div>Loading data...</div>;
    console.log(cryptoList?.data.coins);
    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search Cryptos" size="large" onChange={(e) => setSearchCrypto(e.target.value)} />
                </div>
            )}

            <Row gutter={[24, 24]} className="crypto-card-container">
                {crypto?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
                        <Link to={`/crypto/${currency.uuid}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" src={`${currency.iconUrl}`} />}
                                hoverable
                            >
                                <p>Price: {millify(Number(currency.price))}</p>
                                <p>Price: {millify(Number(currency.marketCap))}</p>
                                <p>Price: {millify(Number(currency.change))}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Cryptocurrencies;
