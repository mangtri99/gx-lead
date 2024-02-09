import { useEffect, useState } from "react";
import useFetch from "../../../composables/useFetch";
import { CHART_URL } from "../../../config/api";
import { APIResponse, CardItem, ChartItem } from "../../../config/types";
import { useSearchParams } from "react-router-dom";
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
  const [data, setData] = useState<APIResponse<ChartData>>();
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState({
    date_start: searchParams.get('date_start') || undefined,
    date_end: searchParams.get('date_end') || undefined,
  })
  const { $fetch } = useFetch();

  const fetchChartData = async () => {
    setLoading(true)
    try {
      const res = await $fetch<APIResponse<ChartData>>(CHART_URL, {
        method: 'GET',
        params: searchParams,
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
    const filteredQuery = filterQs(query)
    setSearchParams(filteredQuery)
    fetchChartData()
  }

  // reset filter
  const reset = async () => {
    setQuery({
      date_start: undefined,
      date_end: undefined,
    })
    setSearchParams({})
    fetchChartData()
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
