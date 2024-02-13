import { useEffect, useState } from "react";
import useFetch from "../../../composables/useFetch";
import { CHART_URL } from "../../../config/api";
import { APIResponse, CardItem, ChartItem } from "../../../config/types";
import * as htmlToImage from 'html-to-image';
import filterQs from "../../../helper/filterQs";

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
  const defaultQuery = {
    date_start: '',
    date_end: ''
  }
  const [data, setData] = useState<APIResponse<ChartData>>();
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(defaultQuery)
  const { $fetch } = useFetch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchChartData = async (params?: typeof defaultQuery) => {
    setLoading(true)
    try {
      let filteredQuery = filterQs(query)
      if(params){
        filteredQuery = filterQs(params)
      }
      const res = await $fetch<APIResponse<ChartData>>(CHART_URL, {
        method: 'GET',
        params: filteredQuery,
      })
      setData(res.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  // filter and search
  const filter = () => {
    fetchChartData()
  }

  // reset filter
  const reset = async () => {
    setQuery(defaultQuery)
    fetchChartData(defaultQuery)
  }

  // save dashboard to image
  const saveToImage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    htmlToImage.toPng(document.getElementById('chart-container'))
     .then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = dataUrl;
      link.click();

    });
  }

  // fetch data on mount
  useEffect(() => {
    fetchChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    query,
    setQuery,
    filter,
    reset,
    saveToImage
  };
}
