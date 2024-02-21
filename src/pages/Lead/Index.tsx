import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import Filter from "./_components/Filter";
import List from "./_components/List";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import HeadWrapper from "../../components/General/HeadWrapper";
import useListState from "../../composables/useListState";
import { Lead } from "../../config/types";
import { LEADS_URL } from "../../config/api";
import LeadOptionProvider from "./_components/Provider/LeadOptionProvider";

export default function Index() {
  const queryParams = {
    search: "",
    date_start: "",
    date_end: "",
    status: "",
    probability: "",
    branch: "",
    type: "",
    channel: "",
    media: "",
    source: "",
    page: "",
  };
  const {
    data,
    destroy,
    handlePagination,
    loading,
    query,
    setQuery,
    filter,
    resetFilter,
    fetchData,
  } = useListState<Lead, typeof queryParams>({
    queryParams,
    url: LEADS_URL,
  });

  return (
    <HeadWrapper title="List of Lead" description="List of Lead">
      <LeadOptionProvider>
        <Card className="p-3 h-100">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="fs-20">Leads Manage</h1>
            <Link to={"/leads/create"} className="text-decoration-none">
              <Button size="sm" className="d-flex align-items-center me-2">
                <span className="me-2 fs-14">Add New</span>
                <LuPlus size={24} />
              </Button>
            </Link>
          </div>
          <Filter
            query={query}
            setQuery={setQuery}
            filter={filter}
            resetFilter={resetFilter}
          />
          <div className="mt-4 w-100 d-flex flex-column flex-1">
            <List
              data={data}
              handleDelete={destroy}
              handlePagination={handlePagination}
              loading={loading}
              fetchLeads={fetchData}
            />
          </div>
        </Card>
      </LeadOptionProvider>
    </HeadWrapper>
  );
}
