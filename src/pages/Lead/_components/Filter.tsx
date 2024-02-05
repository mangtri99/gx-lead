import SelectInput from "../../../components/Select/Index";
import useLeadListState from "../_hooks/useLeadListState";
import useLeadOptionFilter from "../_hooks/useLeadOptionFilter";
import { FiSearch } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";


export default function Filter() {
  const { branchOptions, statusOptions } = useLeadOptionFilter();
  const { query, setQuery, filter } = useLeadListState();
  return (
    <div className="row mt-4">
      <div className="col-6">
        <div className="row g-2">
          <div className="col-6"></div>
          <div className="col-6"></div>
        </div>
      </div>
      <div className="col-6">
        <div className="row g-2">
          <div className="col-4">
            <SelectInput
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
          </div>
          <div className="col-4">
            <SelectInput
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
              className="btn btn-outline-warning"
              type="button"
              style={{
                paddingTop: "6px",
                paddingBottom: "6px",
              }}
            >
              <LuFilter size={20} className="text-black"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
