import SelectInput from "../../../components/Select/SelectInput";
import useLeadListState from "../_hooks/useLeadListState";
import useLeadOptionFilter from "../_hooks/useLeadOptionFilter";
import { FiSearch } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";

export default function Filter() {
  const { branchOptions, statusOptions } = useLeadOptionFilter();
  const { query, setQuery, filter, resetFilter } = useLeadListState();
  return (
    <div className="row mt-4 g-2 align-items-end">
      <div className="col-xl-3 col-lg-4 col-12">
        <label className="w-100" htmlFor="search">
          <span className="fs-14 text-secondary">Search</span>
          <input
            id="search"
            value={query.search}
            onChange={(e) =>
              setQuery({
                ...query,
                search: e.target.value,
              })
            }
            type="text"
            className="form-control w-100 text-secondary"
            placeholder="Search by Text"
          />
        </label>
      </div>
      <div className="col-xl-3 col-lg-4 col-12">
        <label className="w-100" htmlFor="date">
          <span className="fs-14 text-secondary">Date</span>
          <input
            id="date"
            value={query.date_start}
            onChange={(e) =>
              setQuery({
                ...query,
                date_start: e.target.value,
              })
            }
            type="date"
            className="form-control w-100 text-secondary"
            placeholder="12/02/2022 - 13/03/2022"
          />
        </label>
      </div>
      <div className="col-xl-2 col-lg-3 col-12">
        <label className="w-100" htmlFor="status">
          <span className="fs-14 text-secondary">Status</span>
          <SelectInput
            id="status"
            options={statusOptions}
            value={query.status}
            onChange={(e) =>
              setQuery({
                ...query,
                status: e.value,
              })
            }
            placeholder="Select Status"
          />
        </label>
      </div>
      <div className="col-xl-2 col-lg-3 col-12">
        <label className="w-100" htmlFor="branch">
          <span className="fs-14 text-secondary">Branch Office</span>

          <SelectInput
            id="branch"
            options={branchOptions}
            value={query.branch}
            onChange={(e) =>
              setQuery({
                ...query,
                branch: e.value,
              })
            }
            placeholder="Select Branch"
          />
        </label>
      </div>
      <div className="col-auto">
        <button
          onClick={() => filter()}
          className="btn btn-warning"
          type="button"
          style={{
            paddingTop: "6px",
            paddingBottom: "6px",
          }}
        >
          <span className="me-2 fs-14">Search</span>
          <FiSearch size={20} />
        </button>
      </div>
      <div className="col-auto">
        <button
          onClick={() => resetFilter()}
          className="btn btn-outline-warning"
          type="button"
          style={{
            paddingTop: "6px",
            paddingBottom: "6px",
          }}
        >
          <LuFilter size={20} className="text-black" />
        </button>
      </div>
    </div>
  );
}
