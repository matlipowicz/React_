import { Line } from "react-chartjs-2";
import { History } from "../services/types";
import { ChartData, ChartOptions, CategoryScale, Chart, Title, Tooltip, LineElement, Legend, LinearScale, PointElement } from "chart.js";

Chart.register(Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement);

const CryptoChart = ({ coinHistory, currentPrice, name }: { coinHistory: History[]; currentPrice: string; name: string }) => {
    const coinPrice: Array<string> = [];
    const coinTimestamp: Array<string> = [];

    coinHistory.map((value: History) => {
        console.log(value?.price);
        // coinPrice.push(value?.price);
    });
    coinHistory.map((value: History) => {
        coinTimestamp.push(new Date(value?.timestamp * 1000).toLocaleDateString());
    });

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: "Price in USD",
                data: coinPrice,
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd",
            },
        ],
    };

    const options: ChartOptions<"line"> = {
        scales: {
            y: {
                beginAtZero: true,

                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default CryptoChart;
