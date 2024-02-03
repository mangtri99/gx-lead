import { useEffect, useState } from "react";
import useFetch from "../../../composables/useFetch";
import { CHART_URL } from "../../../config/api";
import { APIResponse, CardItem, ChartItem } from "../../../config/types";

interface ChartData {
  statuses: CardItem[];
  branches: ChartItem;
  probabilities: ChartItem;
  types: ChartItem;
  channels: ChartItem;
  medias: ChartItem;
  sources: ChartItem;
  leads: {
    total: number;
  };
}

export default function useChartState() {
  const [data, setData] = useState<APIResponse<ChartData>>();
  const { $fetch } = useFetch();

  const fetchChartData = async () => {
    await $fetch(CHART_URL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
  };
}
