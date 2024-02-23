import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import List from "./_components/List";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import HeadWrapper from "../../components/General/HeadWrapper";
import LeadOptionProvider from "./_components/Provider/LeadOptionProvider";
import LeadListProvider from "./_components/Provider/LeadListProvider";
import Filter from "./_components/Filter";

export default function Index() {

  return (
    <HeadWrapper title="List of Lead" description="List of Lead">
      <LeadOptionProvider>
        <LeadListProvider>
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
          <Filter />
          <div className="mt-4 w-100 d-flex flex-column flex-1">
            <List />
          </div>
        </Card>
        </LeadListProvider>
      </LeadOptionProvider>
    </HeadWrapper>
  );
}
