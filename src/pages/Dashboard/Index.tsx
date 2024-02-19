import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import CardWidget from "../../components/Card/CardWidget";
import useChartState from "./_hooks/useChartState";
import PieChart from "../../components/Chart/PieChart";
import { LuImage } from "react-icons/lu";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import DateGroupInput from "../../components/Input/DateGroupInput";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/General/Loading";

ChartJS.register(Colors, ArcElement, Tooltip, Legend);

export default function Index() {
  const { data, query, setQuery, filter, reset, saveToImage, loading } = useChartState();
  return (
    <div className="h-100 d-flex flex-column">
      <Helmet>
        <title>Lead Summary</title>
        <meta name="description" content="Lead Summary" />
      </Helmet>
      <div className="d-flex flex-xl-row flex-column justify-content-xl-between align-items-xl-end">
        <h1 className="fw-bold fs-20 mb-lg-0 mb-3">Lead Summary</h1>
        <div className="row g-2 flex-md-row flex-column flex-wrap align-items-md-end">
          <div className="col">
            <DateGroupInput
              separator="to"
              label={
                <>
                  Date Range (<span className="text-warning">Max 3 Month</span>)
                </>
              }
              dateValueStart={
                query.date_start ? new Date(query.date_start) : undefined
              }
              dateValueEnd={
                query.date_end ? new Date(query.date_end) : undefined
              }
              onChangeDateStart={(e) =>
                setQuery({
                  ...query,
                  date_start: e ? e.toISOString() : "",
                })
              }
              onChangeDateEnd={(e) =>
                setQuery({
                  ...query,
                  date_end: e ? e.toISOString() : "",
                })
              }
              placeholderDateStart="21/12/2023"
              placeholderDateEnd="21/01/2024"
            />
          </div>
          <div className="col-auto mt-3 mt-lg-0">
            <div className="d-flex align-items-end ">
              <Button
                size="sm"
                onClick={() => filter()}
                disabled={!query.date_start && !query.date_end}
              >
                Search
              </Button>
              <Button
                className="mx-2"
                size="sm"
                onClick={() => reset()}
                disabled={!query.date_start && !query.date_end}
              >
                Reset
              </Button>
              <Button
                className="d-flex align-items-center"
                size="sm"
                onClick={() => saveToImage()}
              >
                Save to image
                <LuImage size={16} className="ms-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="w-100 flex-1 d-flex align-items-center justify-content-center">
          <Loading />
        </div>
      ) : (
      <div className="flex-1 mt-lg-5 mt-4 bg-background" id="chart-container">
        <div className="row align-items-stretch">
          <div className="col-6 col-sm-4 col-md-3 col-xl-2 mb-3">
            <CardWidget title={data?.data.leads.total} subtitle="Leads" />
          </div>
          {data?.data.statuses.map((status, index: number) => (
            <div className="col-6 col-sm-4 col-md-3 col-xl-2 mb-3" key={index}>
              <CardWidget title={status.total} subtitle={status.name} />
            </div>
          ))}
        </div>
        <div className="row align-items-stretch">
          <div className="col-md-6 col-12 mt-4">
            <Card>
              <Card.Body>
                <div>
                  <p className="text-center mb-2">Probability</p>
                  <PieChart
                    data={data?.data.probabilities.total}
                    labels={data?.data.probabilities.name}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-6 col-12 mt-4">
            <Card>
              <Card.Body>
                <div>
                  <p className="text-center mb-2">Channel</p>
                  <PieChart
                    data={data?.data.channels.total}
                    labels={data?.data.channels.name}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-6 col-12 mt-4">
            <Card>
              <Card.Body>
                <div>
                  <p className="text-center mb-2">Media</p>
                  <PieChart
                    data={data?.data.medias.total}
                    labels={data?.data.medias.name}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="col-md-6 col-12 mt-4">
            <Card>
              <Card.Body>
                <div>
                  <p className="text-center mb-2">Source</p>
                  <PieChart
                    data={data?.data.sources.total}
                    labels={data?.data.sources.name}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
