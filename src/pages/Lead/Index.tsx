import { Link } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import Filter from "./_components/Filter";
import List from "./_components/List";
import Card from "../../components/Card/Card";

export default function Index() {
  return (
    <Card className="p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="fs-20">Leads Manage</h1>
        <Link to={"/leads/create"} className="text-decoration-none">
          <button
            className="btn btn-warning d-flex align-items-center"
            type="button"
          >
            <span className="me-2">Add New</span>
            <LuPlus size={24} />
          </button>
        </Link>
      </div>
      <Filter />
      <div className="mt-4 w-100">
        <List />
      </div>
    </Card>
  );
}
