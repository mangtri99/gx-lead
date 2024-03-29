import { LuPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import Badge from "../../components/General/Badge";
import dayjs from "dayjs";
import TextInfo from "./_components/TextInfo";
import NotFound from "../../components/General/NotFound";
import Loading from "../../components/General/Loading";
import Button from "../../components/Button/Button";
import HeadWrapper from "../../components/General/HeadWrapper";
import useDetailState from "../../composables/useDetailState";
import { Lead } from "../../config/types";
import { LEADS_URL } from "../../config/api";

export default function Detail() {
  const { data, loading } = useDetailState<Lead>({
    url: LEADS_URL
  });
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center flex-1">
        <Loading />
      </div>
    );
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <HeadWrapper
      title={`Lead Detail - ${data.lead_number}`}
      description="Info Lead"
    >
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="fs-20 fw-medium mb-0">Lead Detail</h1>
        <div className="d-flex align-items-center">
          <Link to={"/leads/create"} className="text-decoration-none">
            <Button className="d-flex align-items-center me-2">
              <span className="me-2">Add New</span>
              <LuPlus size={24} />
            </Button>
          </Link>
          <Link to={"/leads"} className="text-decoration-none">
            <Button outline variant="secondary">
              Back
            </Button>
          </Link>
        </div>
      </div>
      <div className="card bg-white p-3 mt-4">
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center">
          <div className="d-flex flex-md-row flex-column align-items-md-center">
            <div className="d-flex align-items-center">
              <p className="fs-20 fw-medium text-primary mb-0">
                #{data?.lead_number}
              </p>
              <Button
                variant="secondary"
                className="mx-3 d-flex align-items-center p-2 rounded-circle"
                onClick={() => navigate(`/leads/${data.id}/edit`)}
              >
                <FaEdit size={12} />
              </Button>
            </div>
            <Badge color="primary" className="d-flex align-items-center">
              <BiHomeAlt size={16} />
              <span className="text-black fs-12 ms-1 fw-normal">
                {data?.branch.name}
              </span>
            </Badge>
          </div>
          <Badge
            color="success"
            className="d-flex align-items-center my-2 mt-lg-0"
          >
            <FaCheck size={16} className="me-2" />
            <span className="fw-normal">{data?.probability.name}</span>
          </Badge>
        </div>
        <div>
          <p className="text-neutral-700 fs-14 mb-1">
            {dayjs(data?.created_at).format("DD MMM YYYY")}
          </p>
        </div>
        <div className="mt-4 row fs-14">
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <TextInfo title="Primary Contact" value={data?.fullname} />
            </div>
            <div className="mb-3">
              <TextInfo title="Address" value={data?.address} />
            </div>
            <div className="mb-3">
              <TextInfo title="Email" value={data?.email} />
            </div>
            <div className="mb-3">
              <TextInfo title="Phone No." value={data?.phone_number} />
            </div>
            <div className="mb-3">
              <TextInfo
                title="Is Coverage"
                value={data?.is_coverage ? "Yes" : "No"}
              />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <TextInfo
                title="Status"
                value={<Badge color="primary">{data?.status.name}</Badge>}
              />
            </div>
            <div className="mb-3">
              <TextInfo
                title="Probability"
                value={<Badge color="info">{data?.probability.name}</Badge>}
              />
            </div>
            <div className="mb-3">
              <TextInfo
                title="Source"
                value={`${data?.type.name} - ${data?.source?.name}`}
              />
            </div>
            <div className="mb-3">
              <TextInfo title="Media" value={data?.media?.name} />
            </div>
            <div className="mb-3">
              <TextInfo title="Type Customer" value="New" />
            </div>
            <div className="mb-3">
              <TextInfo
                title="Created"
                value={
                  <div>
                    <p className="fw-medium text-black fs-14 mb-0">
                      {data?.user.name}
                    </p>
                    <p className="text-secondary fs-12 mb-0">
                      {dayjs(data?.created_at).format("DD MMM YYYY HH::mm")}
                    </p>
                  </div>
                }
              />
            </div>
            <div className="mb-3">
              <TextInfo
                title="Last Update"
                value={
                  <div>
                    <p className="fw-medium text-black fs-14 mb-0">
                      {data?.user.name}
                    </p>
                    <p className="text-secondary fs-12 mb-0">
                      {dayjs(data?.updated_at).format("DD MMM YYYY HH::mm")}
                    </p>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </HeadWrapper>
  );
}
