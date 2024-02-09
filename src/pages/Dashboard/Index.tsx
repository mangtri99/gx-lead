import CardWidget from "../../components/Card/CardWidget";
import useChartState from "./_hooks/useChartState";
import PieChart from "../../components/Chart/PieChart";
import { LuImage } from "react-icons/lu";

export default function Index() {
  const { data, query, setQuery, filter, reset, saveToImage } = useChartState();
  return (
    <div>
      <div className="d-flex flex-lg-row flex-column justify-content-lg-between align-items-lg-center">
        <h1 className="fw-bold fs-20 mb-0">Lead Summary</h1>
        <div className="d-flex align-items-end">
          <label htmlFor="">
            <span className="fs-12">
              Date Range (<span className="text-blue">Max 3 Month</span>)
            </span>
            <div className="d-flex">
              <div className="input-group">
                <input
                  value={query.date_start === undefined ? "" : query.date_start}
                  onChange={(e) =>
                    setQuery({
                      ...query,
                      date_start: e.target.value,
                    })
                  }
                  type="date"
                  className="form-control form-control-sm fs-14"
                  aria-label="Date start"
                  placeholder="21/12/2023"
                />
                <span className="input-group-text" style={{
                  fontSize: "12px",
                  backgroundColor: '#E8E8E8',
                }}>to</span>
                <input
                  value={query.date_end === undefined ? "" : query.date_end}
                  onChange={(e) =>
                    setQuery({
                      ...query,
                      date_end: e.target.value,
                    })
                  }
                  type="date"
                  className="form-control form-control-sm fs-14"
                  aria-label="Date end"
                  placeholder="21/01/2024"
                />
              </div>
            </div>
          </label>
          <button
            type="button"
            className="btn btn-sm btn-warning ms-2"
            onClick={() => filter()}
            disabled={!query.date_start && !query.date_end}
          >
            Search
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger mx-2"
            onClick={() => reset()}
            disabled={!query.date_start && !query.date_end}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-sm btn-warning d-flex align-items-center"
            onClick={() => saveToImage()}
          >
            Save to image
            <LuImage size={16} className="ms-2" />
          </button>
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
            <div className="card p-3 bg-white border-0 shadow-sm">
              <p className="text-center">Probability</p>
              <PieChart
                data={data?.data.probabilities.total}
                labels={data?.data.probabilities.name}
              />
            </div>
          </div>

          <div className="col-md-6 col-12 mt-4">
            <div className="card p-3 bg-white border-0 shadow-sm">
              <p className="text-center">Channel</p>
              <PieChart
                data={data?.data.channels.total}
                labels={data?.data.channels.name}
              />
            </div>
          </div>

          <div className="col-md-6 col-12 mt-4">
            <div className="card p-3 bg-white border-0 shadow-sm">
              <p className="text-center">Media</p>
              <PieChart
                data={data?.data.medias.total}
                labels={data?.data.medias.name}
              />
            </div>
          </div>

          <div className="col-md-6 col-12 mt-4">
            <div className="card p-3 bg-white border-0 shadow-sm">
              <p className="text-center">Source</p>
              <PieChart
                data={data?.data.sources.total}
                labels={data?.data.sources.name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
