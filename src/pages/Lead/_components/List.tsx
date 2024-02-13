import { useNavigate } from "react-router-dom";
import Table from "../../../components/General/Table";
import dayjs from "dayjs";
import Badge from "../../../components/General/Badge";
import { LuMoreVertical } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import Pagination from "../../../components/General/Pagination";
import Loading from "../../../components/General/Loading";
import Dialog from "../../../components/General/Dialog";
import Button from "../../../components/Button/Button";
import { APIResponsePagination, Lead } from "../../../config/types";
import Modal from "bootstrap/js/dist/modal";
import { useState } from "react";

interface Props {
  data: APIResponsePagination<Lead[]> | undefined;
  handleDelete: (val: string) => void;
  handlePagination: (val: string) => void;
  loading: boolean;
}

export default function List(props: Props) {
  const { data, handleDelete, handlePagination, loading } = props;
  const [item, setItem] = useState<Lead>();
  const probabilityColor = (probability: string) => {
    if (probability === "Pending") {
      return "primary";
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

  // show modal confirm delete
  const confirmDelete = (lead: Lead) => {
    setItem(lead);
    const formModal = new Modal("#modalConfirmDeleteLead");
    formModal.show();
  };

  const onDelete = async () => {
    // perform delete
    handleDelete(item?.id ? String(item.id) : "");
    // close modal after delete
    const btnCloseModal = document.getElementById('btn-close-confirm-delete') as HTMLButtonElement
    btnCloseModal.click()
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <>
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
          {(() => {
            if (data && data?.data.length > 0) {
              const table = data.data.map((lead) => {
                return (
                  <Table.Row key={lead.id}>
                    <Table.Item>
                      <div>
                        <p className="text-black mb-2 fw-medium">
                          {lead.fullname}
                        </p>
                        <p className="text-secondary mb-2">{lead.address}</p>
                        <p className="text-primary mb-2 fw-medium">
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
                              <p className="mb-0 text-black">
                                {lead.user.name}
                              </p>
                              {/* Format e.g. 29 Jan 2024 */}
                              <p className="text-secondary mb-0 nowrap">
                                {dayjs(lead.created_at).format(
                                  "DD MMM YYYY HH:mm"
                                )}
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
                        <Badge color="warning">{lead.status.name}</Badge>
                      </div>
                      <div className="mb-2">
                        <p className="mb-0 text-secondary">Notes:</p>
                        <p className="mb-0 text-black fw-medium">
                          {lead.notes}
                        </p>
                      </div>
                    </Table.Item>
                    <Table.Item>
                      <div className="mb-2">
                        <p className="mb-0 text-secondary">Type:</p>
                        <p className="mb-0 text-black fw-medium">
                          {lead.type.name}
                        </p>
                      </div>
                      <div className="mb-2">
                        <p className="mb-0 text-secondary">Channel:</p>
                        <p className="mb-0 text-black fw-medium">
                          {lead.channel.name}
                        </p>
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
                              onClick={() =>
                                navigate(`/leads/${lead.id}/detail`)
                              }
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
                              onClick={() => confirmDelete(lead)}
                              className="dropdown-item text-danger fs-14 text-decoration-none"
                            >
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </Table.Item>
                  </Table.Row>
                );
              });
              return table;
            } else {
              return (
                <Table.Row>
                  <Table.Item colSpan={5} className="text-center">
                    No data available
                  </Table.Item>
                </Table.Row>
              );
            }
          })()}
        </Table.Body>
      </Table>
      <div className="mt-4 d-flex justify-content-end">
        {data && data?.data.length > 0 && (
          <Pagination
            currentPage={data?.meta.current_page}
            lastPage={data?.meta.last_page}
            handleChangePage={(e) => handlePagination(e)}
          />
        )}
      </div>
      <Dialog id="modalConfirmDeleteLead" title="Confirm Delete">
        <div>
          <p className="text-black fs-14">
            Are you sure to delete lead <span className="fw-bold">#{item?.lead_number}</span>?
          </p>
          <div className="d-flex align-items-center justify-content-end mt-4">
            <Button
              className="me-2"
              size="sm"
              id="btn-close-confirm-delete"
              data-bs-dismiss="modal"
            >
              Cancel
            </Button>
            <Button
              className="me-2"
              size="sm"
              variant="danger"
              onClick={() => onDelete()}
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
