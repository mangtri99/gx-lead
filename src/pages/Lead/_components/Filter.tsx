import Button from "../../../components/Button/Button";
import TextInput from "../../../components/Input/TextInput";
import SelectInput from "../../../components/Select/SelectInput";
import useLeadOptionFilter from "../_hooks/useLeadOptionFilter";
import { FiSearch } from "react-icons/fi";
import { LuFilter } from "react-icons/lu";

interface Props {
  query: {
    search: string;
    date_start: string;
    status: string;
    branch: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setQuery: (val: any) => void;
  filter: () => void;
  resetFilter: () => void;
}

export default function Filter(props: Props) {
  const { branchOptions, statusOptions } = useLeadOptionFilter();
  const { query, setQuery, filter, resetFilter } = props
  return (
    <div className="row mt-4 g-2 align-items-end">
      <div className="col-xl-3 col-lg-4 col-12">
        <TextInput
          placeholder="Search by Text"
          label="Search"
          className="w-100"
          value={query.search}
          id="search"
          onChange={(e) => {
            setQuery({
              ...query,
              search: e.target.value,
            });
          }}
        />
      </div>
      <div className="col-xl-3 col-lg-4 col-12">
        <TextInput
          placeholder="12/02/2022 - 13/03/2022"
          label="Date"
          className="w-100"
          value={query.date_start}
          id="date"
          onChange={(e) =>
            setQuery({
              ...query,
              date_start: e.target.value,
            })
          }
          type="date"
        />
      </div>
      <div className="col-xl-2 col-lg-3 col-12">
        <SelectInput
          id="status"
          labelInput="Status"
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
      <div className="col-xl-2 col-lg-3 col-12">
        <SelectInput
          id="branch"
          labelInput="Branch Office"
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
      <div className="col-auto d-flex">
        <Button
          className="me-2"
          onClick={() => filter()}
        >
          <span className="me-2 fs-14">Search</span>
          <FiSearch size={20} />
        </Button>
        <Button
          outline
          onClick={() => resetFilter()}
        >
          <LuFilter size={20} />
        </Button>
      </div>
    </div>
  );
}
