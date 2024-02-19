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
import { useContext, useState } from "react";
import ButtonActionIcon from "../../../components/Button/ButtonActionIcon";
import { FiEdit } from "react-icons/fi";
import SelectInput from "../../../components/Input/SelectInput";
import useLeadFormState from "../_hooks/useLeadFormState";
import { Controller } from "react-hook-form";
import { LeadOptionContext } from "../_hooks/context/LeadOptionContext";

interface Props {
  data: APIResponsePagination<Lead[]> | undefined;
  handleDelete: (val: string) => void;
  handlePagination: (val: string) => void;
  loading: boolean;
  fetchLeads: () => Promise<void>;
}

export default function List(props: Props) {
  const { data, handleDelete, handlePagination, loading, fetchLeads } = props;
  const { probabilities, statuses, users } = useContext(LeadOptionContext);
  const { onSubmit, form } = useLeadFormState({
    isEdit: true,
  });
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
    const btnCloseModal = document.getElementById(
      "btn-close-confirm-delete"
    ) as HTMLButtonElement;
    btnCloseModal.click();
  };

  const onDropdownChange = (data: Lead) => {
    form.reset({
      assigne_id: data.assigne_id,
      address: data.address,
      branch_id: data.branch.id,
      channel_id: data.channel.id,
      email: data.email,
      fullname: data.fullname,
      id: data.id,
      company_name: data.company_name,
      is_coverage: String(data.is_coverage),
      latitude: data.latitude,
      longitude: data.longitude,
      media_id: data.media_id,
      notes: data.notes,
      phone_number: data.phone_number,
      probability_id: data.probability.id,
      source_id: data.source_id,
      status_id: data.status_id,
      type_id: data.type_id,
    });
  };

  const onUpdate = async () => {
    await onSubmit(form.getValues());
    fetchLeads();
  };

  if (loading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center flex-1">
        <Loading />
      </div>
    );
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
                        <div className="d-flex align-items-center">
                          <Badge
                            color={probabilityColor(lead.probability.name)}
                          >
                            {lead.probability.name}
                          </Badge>
                          <div className="dropdown">
                            <ButtonActionIcon
                              className="d-flex align-items-center p-2 rounded-circle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              data-bs-auto-close="outside"
                              onClick={() => onDropdownChange(lead)}
                            >
                              <FiEdit size={14} />
                            </ButtonActionIcon>
                            <ul className="dropdown-menu p-2">
                              <Controller
                                control={form.control}
                                name="probability_id"
                                render={({ field }) => (
                                  <SelectInput
                                    id="probability"
                                    ref={field.ref}
                                    options={probabilities || []}
                                    labelInput="Probability"
                                    value={
                                      field.value ? String(field.value) : ""
                                    }
                                    onChange={(e) => {
                                      field.onChange(Number(e.value));
                                    }}
                                    onBlur={field.onBlur}
                                    placeholder="Select Probability"
                                    separator
                                    width="200px"
                                    message={
                                      form.formState.errors.status_id
                                        ?.message as string
                                    }
                                    isClearable={false}
                                  />
                                )}
                              />
                              <div className="mt-2 d-flex justify-content-end">
                                <Button
                                  className="fs-12"
                                  size="sm"
                                  onClick={() => onUpdate()}
                                >
                                  Update
                                </Button>
                              </div>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <p className="mb-0 text-secondary">Status:</p>
                        <div className="d-flex align-items-center">
                          <Badge color="warning">{lead.status.name}</Badge>
                          <div className="dropdown">
                            <ButtonActionIcon
                              className="d-flex align-items-center p-2 rounded-circle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              data-bs-auto-close="outside"
                              onClick={() => onDropdownChange(lead)}
                            >
                              <FiEdit size={14} />
                            </ButtonActionIcon>
                            <ul className="dropdown-menu p-2">
                              <Controller
                                control={form.control}
                                name="status_id"
                                render={({ field }) => (
                                  <SelectInput
                                    id="status"
                                    ref={field.ref}
                                    options={statuses || []}
                                    labelInput="Status"
                                    value={
                                      field.value ? String(field.value) : ""
                                    }
                                    onChange={(e) => {
                                      field.onChange(Number(e.value));
                                    }}
                                    onBlur={field.onBlur}
                                    placeholder="Select Status"
                                    separator
                                    width="200px"
                                    message={
                                      form.formState.errors.status_id
                                        ?.message as string
                                    }
                                    isClearable={false}
                                  />
                                )}
                              />
                              <div className="mt-2 d-flex justify-content-end">
                                <Button
                                  className="fs-12"
                                  size="sm"
                                  onClick={() => onUpdate()}
                                >
                                  Update
                                </Button>
                              </div>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="mb-2">
                        <p className="mb-0 text-secondary">Notes:</p>
                        <p className="mb-0 text-black fw-medium">
                          {lead.notes || "-"}
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
                      <div className="d-flex align-items-center">
                        {lead.assigne_id && (
                          <p className="mb-0 text-black fw-medium">
                            {lead.assigne?.name || "-"}
                          </p>
                        )}
                        <div className="dropdown">
                          <ButtonActionIcon
                            type="button"
                            className={lead.assigne_id ? "py-2 px-3" : ""}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            data-bs-auto-close="outside"
                            onClick={() => onDropdownChange(lead)}
                          >
                            <div className="d-flex align-items-center">
                              {lead.assigne_id ? (
                                <FiEdit size={14} />
                              ) : (
                                <>
                                  <FiUser size={20} />
                                  <span className="text-decoration-underline fs-12 ms-2">
                                    ADD ASSIGNEE
                                  </span>
                                </>
                              )}
                            </div>
                          </ButtonActionIcon>
                          <ul className="dropdown-menu p-2">
                            <Controller
                              control={form.control}
                              name="assigne_id"
                              render={({ field }) => (
                                <SelectInput
                                  id="assigne"
                                  ref={field.ref}
                                  options={users || []}
                                  labelInput="Assignee To"
                                  value={field.value ? String(field.value) : ""}
                                  onChange={(e) => {
                                    field.onChange(
                                      e.value ? Number(e.value) : null
                                    );
                                  }}
                                  onBlur={field.onBlur}
                                  placeholder="Select User"
                                  separator
                                  width="200px"
                                  message={
                                    form.formState.errors.assigne_id
                                      ?.message as string
                                  }
                                  isClearable={false}
                                />
                              )}
                            />
                            <div className="mt-2 d-flex justify-content-end">
                              <Button
                                className="fs-12"
                                size="sm"
                                onClick={() => onUpdate()}
                              >
                                Update
                              </Button>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </Table.Item>
                    <Table.Item className="text-end">
                      <div className="dropdown">
                        <ButtonActionIcon
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <LuMoreVertical size={24} />
                        </ButtonActionIcon>
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
            Are you sure to delete lead{" "}
            <span className="fw-bold">#{item?.lead_number}</span>?
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
