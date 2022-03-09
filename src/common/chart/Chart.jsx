import { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line, Chart, Bar } from "react-chartjs-2";

export function MyChart(props) {
  const { item } = props;

  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    fetch(`https://booster-test.vercel.app/${item.Link}.json`).then(
      async (res) => {
        const data = await res.json();
        console.log(data);
        setDataset(data);
      },
    );
  }, []);

  console.log(dataset);

  return dataset.length > 0 ? (
    <Chart
      type={item.Variant.toLowerCase()}
      data={{
        labels: dataset.map((x) => x.Label),
        datasets: [
          {
            id: 1,
            label: item.Content,
            data: dataset.map((x) => x.Value),
          },
        ],
      }}
    />
  ) : null;
}

function getChartType(type) {
  switch (type) {
    case "Line":
      return Line;
    default:
      return Bar;
  }
}
