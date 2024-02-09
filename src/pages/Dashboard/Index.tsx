import CardWidget from "../../components/Card/CardWidget";
import useChartState from "./_hooks/useChartState";
import PieChart from "../../components/Chart/PieChart";
import { LuImage } from "react-icons/lu";
import MultiDateInput from "../../components/Input/MultiDateInput";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";

export default function Index() {
  const { data, query, setQuery, filter, reset, saveToImage } = useChartState();
  return (
    <div>
      <div className="d-flex flex-lg-row flex-column justify-content-lg-between align-items-lg-center">
        <h1 className="fw-bold fs-20 mb-0">Lead Summary</h1>
        <div className="d-flex align-items-end">
          <MultiDateInput
            separator="to"
            label={
              <>
                Date Range (<span className="text-blue">Max 3 Month</span>)
              </>
            }
            dateValueStart={query.date_start}
            dateValueEnd={query.date_end}
            onChangeDateStart={(e) =>
              setQuery({
                ...query,
                date_start: e.target.value,
              })
            }
            onChangeDateEnd={(e) =>
              setQuery({
                ...query,
                date_end: e.target.value,
              })
            }
            placeholderDateStart="21/12/2023"
            placeholderDateEnd="21/01/2024"
          />
          <Button
            className="ms-2"
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
            className="mx-2 d-flex align-items-center"
            size="sm"
            onClick={() => saveToImage()}
            disabled={!query.date_start && !query.date_end}
          >
            Save to image
            <LuImage size={16} className="ms-2" />
          </Button>
        </div>
      </div>
      <div
        className="mt-5"
        style={{
          backgroundColor: "#F5F6F9",
        }}
        id="chart-container"
      >
        <div className="row align-items-stretch">
          <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
            <CardWidget title={data?.data.leads.total} subtitle="Leads" />
          </div>
          {data?.data.statuses.map((status, index: number) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3" key={index}>
              <CardWidget title={status.total} subtitle={status.name} />
            </div>
          ))}
        </div>
        <div className="row align-items-stretch">
          <div className="col-md-6 col-12 mt-4">
            <Card>
              <Card.Body>
                <div>
                  <p className="text-center">Probability</p>
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
                  <p className="text-center">Channel</p>
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
                  <p className="text-center">Media</p>
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
                  <p className="text-center">Source</p>
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
    </div>
  );
}
