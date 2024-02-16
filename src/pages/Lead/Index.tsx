import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import Filter from "./_components/Filter";
import List from "./_components/List";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import useLeadListState from "./_hooks/useLeadListState";
import { LeadOptionContext } from "./_hooks/context/LeadOptionContext";
import useLeadOptionFilter from "./_hooks/useLeadOptionFilter";
import { Helmet } from "react-helmet-async";

export default function Index() {
  const {
    data,
    deleteLead,
    handlePagination,
    loading,
    query,
    setQuery,
    filter,
    resetFilter,
    fetchLeads
  } = useLeadListState();

  const {
    branch,
    types,
    channels,
    media,
    probabilities,
    sources,
    statuses,
    fetchOptions,
  } = useLeadOptionFilter();

  return (
    <LeadOptionContext.Provider value={{ branch, types, channels, media, sources, probabilities, statuses, fetchOptions }}>
      <Helmet>
        <title>List of Lead</title>
        <meta name="description" content="List of Lead" />
      </Helmet>
      <Card className="p-3">
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
        <div className="mt-4 w-100">
          <List
            data={data}
            handleDelete={deleteLead}
            handlePagination={handlePagination}
            loading={loading}
            fetchLeads={fetchLeads}
          />
        </div>
      </Card>
    </LeadOptionContext.Provider>
  );
}
