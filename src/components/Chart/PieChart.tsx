import { Pie } from "react-chartjs-2";

interface Props {
  labels?: string[];
  data?: number[];
  options?: unknown;
}

export default function PieChart(props: Props) {
  return (
    <div>
      <Pie
        data={{
          labels: props.labels,
          datasets: [
            {
              data: props.data,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#FF8A80",
                "#A1887F",
                "#90CAF9",
                "#80CBC4",
                "#FFD180",
                "#FF80AB",
                "#B39DDB",
                "#AED581",
                "#FFD180",
                "#FF80AB",
                "#B39DDB",
                "#AED581",
                "#FFD180",
                "#FF80AB",
                "#B39DDB",
              ],
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              display: true,
              position: "left",
              align: "start",
            }
          },
        }}
      />
    </div>
  );
}
