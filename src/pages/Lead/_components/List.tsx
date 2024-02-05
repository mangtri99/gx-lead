import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table/Index";
import useLeadListState from "../_hooks/useLeadListState";
import dayjs from "dayjs";
import Badge from "../../../components/Badge";
import { LuMoreVertical } from "react-icons/lu";
import { FiUser } from "react-icons/fi";

export default function List() {
  const { data, deleteLead } = useLeadListState();
  const probabilityColor = (probability: string) => {
    if (probability === "Pending") {
      return "warning";
    }
    if (probability === "Cancel") {
      return "danger";
    }
    if (probability === "Converted") {
      return "success";
    }

    return "secondary";
  };
  const navigate = useNavigate();
  const nameWithPlus = (name: string) => {
    return name.replace(/\s/g, "+");
  };
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>#Lead</Table.Head>
          <Table.Head>Primary Contact</Table.Head>
          <Table.Head>Info</Table.Head>
          <Table.Head>Info Source</Table.Head>
          <Table.Head>Assigned To</Table.Head>
          <Table.Head />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data?.data.map((lead) => (
          <Table.Row key={lead.id}>
            <Table.Item>
              <div>
                <p className="text-black mb-2 fw-medium">{lead.fullname}</p>
                <p className="text-secondary mb-2">{lead.address}</p>
                <p className="text-warning mb-2 fw-medium">
                  #{lead.lead_number}
                </p>
                <div className="mb-2">
                  <p className="mb-0 text-secondary">Branch Office:</p>
                  <p className="mb-0">{lead.branch.name}</p>
                </div>
                <div className="mb-2">
                  <p className="mb-0 text-secondary">Created By:</p>
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle me-1"
                      style={{
                        width: 32,
                        height: 32,
                      }}
                      src={`https://ui-avatars.com/api/?background=DD782D&color=fff&name=${nameWithPlus(
                        lead.user.name
                      )}`}
                      alt="user"
                    />
                    <div>
                      <p className="mb-0 text-black">{lead.user.name}</p>
                      {/* Format e.g. 29 Jan 2024 */}
                      <p className="text-secondary mb-0 nowrap">
                        {dayjs(lead.created_at).format("DD MMM YYYY HH:mm")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Table.Item>
            <Table.Item>
              <div>
                <p className="mb-1 text-black">{lead.email}</p>
                <p className="text-secondary">{lead.phone_number}</p>
              </div>
            </Table.Item>
            <Table.Item>
              <div className="mb-2">
                <p className="mb-0 text-secondary">Probability:</p>
                <Badge color={probabilityColor(lead.probability.name)}>
                  {lead.probability.name}
                </Badge>
              </div>
              <div className="mb-2">
                <p className="mb-0 text-secondary">Status:</p>
                <Badge color="primary">{lead.status.name}</Badge>
              </div>
              <div className="mb-2">
                <p className="mb-0 text-secondary">Notes:</p>
                <p className="mb-0 text-black fw-medium">{lead.notes}</p>
              </div>
            </Table.Item>
            <Table.Item>
              <div className="mb-2">
                <p className="mb-0 text-secondary">Type:</p>
                <p className="mb-0 text-black fw-medium">{lead.type.name}</p>
              </div>
              <div className="mb-2">
                <p className="mb-0 text-secondary">Channel:</p>
                <p className="mb-0 text-black fw-medium">{lead.channel.name}</p>
              </div>
              <div className="mb-2">
                <p className="mb-0 text-secondary">Media:</p>
                <p className="mb-0 text-black fw-medium">
                  {lead.media ? lead.media.name : "-"}
                </p>
              </div>
              <div className="mb-2">
                <p className="mb-0 text-secondary">Source:</p>
                <p className="mb-0 text-black fw-medium">
                  {lead.source ? lead.source.name : "-"}
                </p>
              </div>
            </Table.Item>
            <Table.Item className="nowrap">
              <button className="btn" type="button">
                <div className="d-flex align-items-center">
                  <FiUser size={20} />
                  <span className="text-decoration-underline fs-12 ms-2">
                    ADD ASSIGNEE
                  </span>
                </div>
              </button>
            </Table.Item>
            <Table.Item className="text-end">
              <div className="dropdown">
                <button
                  className="btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <LuMoreVertical size={24} />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      role="button"
                      className="dropdown-item fs-14 text-decoration-none"
                      onClick={() => navigate(`/leads/${lead.id}/detail`)}
                    >
                      Detail
                    </a>
                  </li>
                  <li>
                    <a
                      role="button"
                      className="dropdown-item fs-14 text-decoration-none"
                      onClick={() => navigate(`/leads/${lead.id}/edit`)}
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      role="button"
                      onClick={() => deleteLead(String(lead.id))}
                      className="dropdown-item text-danger fs-14 text-decoration-none"
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </Table.Item>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}