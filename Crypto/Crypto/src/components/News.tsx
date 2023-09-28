import { useState } from "react";
import { useGetNewsDataQuery } from "../services/newsApi";
import { useGetCoinsDataQuery } from "../services/coinApi";
import { Value, Coin } from "../services/types";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }: { simplified?: boolean }) => {
    const [newsCategory, setNewsVariant] = useState("Cryptocurrency");
    const count = simplified ? 10 : 100;
    const { data: newsList, isLoading } = useGetNewsDataQuery({ newsCategory, count });
    const { data: coinList } = useGetCoinsDataQuery(100);

    const articles = newsList?.value;
    const defaultNewsImg = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

    if (isLoading) return <h3>Loading...</h3>;
    return (
        <>
            <Row gutter={[24, 24]}>
                {!simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a Crypto"
                            optionFilterProp="chlidren"
                            filterOption={(inputValue, option: any) => option?.children?.toLowerCase()?.indexOf(inputValue.toLowerCase()) >= 0}
                            onChange={(value) => setNewsVariant(value)}
                        >
                            <Option value="Cryptocurrency">Cryptocurrency</Option>
                            {coinList?.data?.coins?.map((coin: Coin, index) => (
                                <Option value={coin.name} key={index}>
                                    {coin.name}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                )}

                {articles?.map((news: Value, index) => {
                    console.log(news);
                    return (
                        <Col xs={24} sm={12} lg={8} key={index}>
                            <Card className="news-card" hoverable>
                                <a href={news.url} target="_blank" rel="noreferrer">
                                    <div className="news-image-container">
                                        <Title className="news-title" level={4}>
                                            {news.name}
                                        </Title>
                                        <img className="img" src={news?.image?.thumbnail?.contentUrl ?? defaultNewsImg}></img>
                                    </div>
                                    <Text className="news-tex">
                                        {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                                    </Text>
                                    <div className="provider-container">
                                        <div>
                                            <Avatar src={news?.provider[0].image?.thumbnail?.contentUrl} className="provider-avatar"></Avatar>
                                            <Text className="provider-name">{news?.provider[0].name}</Text>
                                        </div>

                                        <Text>{moment(news.datePublished).fromNow()}</Text>
                                    </div>
                                </a>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </>
    );
};

export default News;
