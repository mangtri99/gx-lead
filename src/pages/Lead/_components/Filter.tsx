import Button from "../../../components/Button/Button";
import TextInput from "../../../components/Input/TextInput";
import SelectInput from "../../../components/Input/SelectInput";
import useLeadOptionFilter from "../_hooks/useLeadOptionFilter";
import { FiSearch } from "react-icons/fi";
import { LuFilter, LuTrash2 } from "react-icons/lu";

import DatePickerInput from "../../../components/Input/DatePickerInput";
import Dialog from "../../../components/General/Dialog";
import Modal from "bootstrap/js/dist/modal";

interface Props {
  query: {
    search: string;
    date_start: string;
    date_end: string;
    status: string;
    branch: string;
    type: string;
    probability: string;
    channel: string;
    media: string;
    source: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setQuery: (val: any) => void;
  filter: () => void;
  resetFilter: () => void;
}

export default function Filter(props: Props) {
  const { branch, channels, media, probabilities, sources, statuses, types } =
    useLeadOptionFilter();
  const { query, setQuery, filter, resetFilter } = props;
  const openAdvanceFilter = () => {
    const formModal = new Modal("#modalFilterAdvance");
    formModal.show();
  };
  const checkAdvanceFilter = () => {
    if (
      query.probability ||
      query.type ||
      query.channel ||
      query.media ||
      query.source
    ) {
      return (
        <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-pill">
          !
        </div>
      );
    } else {
      return null;
    }
  };
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
        <DatePickerInput
          selectedValue={{
            from: query.date_start ? new Date(query.date_start) : undefined,
            to: query.date_end ? new Date(query.date_end) : undefined,
          }}
          placeholder="Select Date"
          id="date"
          label="Date"
          handleChange={(selected) => {
            setQuery({
              ...query,
              date_start: selected && selected.from ? selected.from : undefined,
              date_end: selected && selected.to ? selected.to : undefined,
            });
          }}
        />
      </div>
      <div className="col-xl-2 col-lg-3 col-12">
        <SelectInput
          id="status"
          labelInput="Status"
          options={statuses || []}
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
          options={branch || []}
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
        <Button className="me-2" onClick={() => filter()}>
          <span className="me-2 fs-14">Search</span>
          <FiSearch size={20} />
        </Button>
        <Button
          className="me-2 position-relative"
          outline
          onClick={() => openAdvanceFilter()}
        >
          <LuFilter size={20} />
          {checkAdvanceFilter()}
        </Button>
        <Button variant="danger" onClick={() => resetFilter()}>
          <LuTrash2 size={20} />
        </Button>
      </div>

      <Dialog id="modalFilterAdvance" size="lg" title="Advance Filter">
        <div>
          <div className="row g-2">
            <div className="col-12 col-lg-3 col-sm-6">
              <SelectInput
                id="probability"
                labelInput="Lead Probability"
                options={probabilities || []}
                value={query.probability}
                onChange={(e) =>
                  setQuery({
                    ...query,
                    probability: e.value,
                  })
                }
                placeholder="Select Probability"
              />
            </div>
            <div className="col-12 col-lg-3 col-sm-6">
              <SelectInput
                id="type"
                labelInput="Lead Type"
                options={types || []}
                value={query.type}
                onChange={(e) =>
                  setQuery({
                    ...query,
                    type: e.value,
                  })
                }
                placeholder="Select Type"
              />
            </div>
            <div className="col-12 col-lg-3 col-sm-6">
              <SelectInput
                id="channel"
                labelInput="Lead Channel"
                options={channels || []}
                value={query.channel}
                onChange={(e) => {
                  // reset source and media
                  setQuery({
                    ...query,
                    media: "",
                    source: "",
                    channel: e.value,
                  });
                }}
                placeholder="Select Channel"
              />
            </div>
            <div className="col-12 col-lg-3 col-sm-6">
              <SelectInput
                id="media"
                labelInput="Lead Media"
                options={
                  media && query.channel
                    ? media.filter(
                        (item) => item.channel_id === Number(query.channel)
                      )
                    : []
                }
                value={query.media}
                onChange={(e) =>
                  setQuery({
                    ...query,
                    source: "",
                    media: e.value,
                  })
                }
                placeholder="Select Media"
              />
            </div>
            <div className="col-12 col-lg-3 col-sm-6">
              <SelectInput
                id="source"
                labelInput="Lead Source"
                options={
                  sources && query.media
                    ? sources.filter(
                        (item) => item.media_id === Number(query.media)
                      )
                    : []
                }
                value={query.source}
                onChange={(e) =>
                  setQuery({
                    ...query,
                    source: e.value,
                  })
                }
                placeholder="Select Source"
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end mt-4">
            <Button
              className="me-2"
              size="sm"
              id="btn-close-modal-filter"
              data-bs-dismiss="modal"
            >
              Cancel
            </Button>
            <Button
              className="me-2"
              size="sm"
              variant="danger"
              onClick={() => {
                filter();
                document.getElementById("btn-close-modal-filter")?.click();
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
