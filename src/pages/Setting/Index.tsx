import Tabs from "../../components/Tabs/Index";
import { LuPlus } from "react-icons/lu";
import useSettingState from "./_hooks/useSettingState";
import Card from "./_components/Card";
import Dialog from "../../components/Dialog/Index";
import TextInput from "../../components/TextInput";
import useSettingFormState from "./_hooks/useSettingFormState";
import { useEffect, useState } from "react";
import {
  CHANNEL_URL,
  MEDIA_URL,
  PROBABILITY_URL,
  SOURCE_URL,
  STATUS_URL,
  TYPE_URL,
} from "../../config/api";
import { Controller } from "react-hook-form";
import SelectInput from "../../components/Select/Index";
import { SelectOptions } from "../../config/types";

export default function Index() {
  const {
    types,
    channels,
    media,
    probabilities,
    sources,
    statuses,
    fetchOptions,
  } = useSettingState();
  const {
    tab,
    tabs,
    getLabelTab,
    handleChangeTab,
    form,
    onSubmit,
    onInvalid,
    handleDelete,
    handleEdit,
    isEdit,
    handleAdd,
  } = useSettingFormState();
  const [mediaOptions, setMediaOptions] = useState<SelectOptions[]>();
  const [channelOptions, setChannelOptions] = useState<SelectOptions[]>();

  // fetch options on first load
  useEffect(() => {
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (media) {
      const options = media.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setMediaOptions(options);
    }
  }, [media]);

  useEffect(() => {
    if (sources) {
      const options = sources.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setChannelOptions(options);
    }
  }, [sources]);

  return (
    <div>
      <h1 className="mb-0 fs-20 fw-medium text-black">Lead Setting</h1>
      <div className="card bg-white mt-4 p-3 border-0">
        <Tabs
          items={tabs}
          value={tab}
          onChangeTab={(val) => {
            console.log(val);
            handleChangeTab(val);
          }}
        />
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <p className="fs-20 mb-0 fw-medium">{getLabelTab()}</p>
          <button
            className="btn btn-sm btn-warning d-flex align-items-center me-2"
            type="button"
            onClick={() => handleAdd()}
          >
            <span className="me-2 fs-14">Add New</span>
            <LuPlus size={24} />
          </button>
        </div>
        <div className="row g-2 mt-3">
          {tab === TYPE_URL &&
            types &&
            types?.length > 0 &&
            types.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-6">
                <Card
                  item={item}
                  onDelete={() => handleDelete(String(item.id))}
                  onEdit={() => handleEdit(item)}
                />
              </div>
            ))}

          {tab === CHANNEL_URL &&
            channels &&
            channels?.length > 0 &&
            channels.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-6">
                <Card
                  item={item}
                  onDelete={() => handleDelete(String(item.id))}
                  onEdit={() => handleEdit(item)}
                />
              </div>
            ))}

          {tab === MEDIA_URL &&
            media &&
            media?.length > 0 &&
            media.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-6">
                <Card
                  item={item}
                  onDelete={() => handleDelete(String(item.id))}
                  onEdit={() => handleEdit(item)}
                />
              </div>
            ))}

          {tab === PROBABILITY_URL &&
            probabilities &&
            probabilities?.length > 0 &&
            probabilities.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-6">
                <Card
                  item={item}
                  onDelete={() => handleDelete(String(item.id))}
                  onEdit={() => handleEdit(item)}
                />
              </div>
            ))}

          {tab === SOURCE_URL &&
            sources &&
            sources?.length > 0 &&
            sources.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-6">
                <Card
                  item={item}
                  onDelete={() => handleDelete(String(item.id))}
                  onEdit={() => handleEdit(item)}
                />
              </div>
            ))}

          {tab === STATUS_URL &&
            statuses &&
            statuses?.length > 0 &&
            statuses.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-6">
                <Card
                  item={item}
                  onDelete={() => handleDelete(String(item.id))}
                  onEdit={() => handleEdit(item)}
                />
              </div>
            ))}
        </div>
      </div>
      {/* Modal Dialog Form Add/Edit */}
      <Dialog
        id="modal"
        title={isEdit ? `Update ${getLabelTab()}` : "Add New Setting"}
      >
        <form
          className="w-100"
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        >
          <div className="mb-3">
            <TextInput
              {...form.register("name")}
              id="name"
              type="text"
              label="Name"
              placeholder="Name"
              error={form.formState.errors.name ? true : false}
              message={form.formState.errors.name?.message}
            />
          </div>
          <div className="mb-3">
            <TextInput
              {...form.register("description")}
              id="description"
              type="text"
              label="Description"
              placeholder="Description"
              error={form.formState.errors.description ? true : false}
              message={form.formState.errors.description?.message}
            />
          </div>

          {tab === MEDIA_URL && (
            <div className="mb-3">
              <Controller
                control={form.control}
                name="channel_id"
                render={({ field }) => (
                  <label htmlFor="channel" className="form-label fs-14 w-100">
                    <span className="mb-1 d-block">Select Channel</span>
                    <SelectInput
                      id="channel"
                      ref={field.ref}
                      options={channelOptions || []}
                      value={field.value ? String(field.value) : ""}
                      onChange={(e) =>
                        field.onChange(e.value === "" ? undefined : e.value)
                      }
                      onBlur={field.onBlur}
                      placeholder="Select Channel"
                    />
                  </label>
                )}
              />
            </div>
          )}

          {tab === SOURCE_URL && (
            <div className="mb-3">
              <Controller
                control={form.control}
                name="media_id"
                render={({ field }) => (
                  <label htmlFor="status" className="form-label fs-14 w-100">
                    <span className="mb-1 d-block">Select Media</span>
                    <SelectInput
                      id="status"
                      ref={field.ref}
                      options={mediaOptions || []}
                      value={field.value ? String(field.value) : ""}
                      onChange={(e) =>
                        field.onChange(e.value === "" ? undefined : e.value)
                      }
                      onBlur={field.onBlur}
                      placeholder="Select Media"
                    />
                  </label>
                )}
              />
            </div>
          )}

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-warning fs-14">
              Save
            </button>
          </div>
        </form>
      </Dialog>
      <Dialog id="modalConfirmDelete" title="Confirm Delete">
        <div>
          <p className="text-black fs-14">Are you sure to delete this?</p>
          <div className="d-flex align-items-center justify-content-end mt-4">
            <button type="button" className="btn btn-sm btn-secondary me-2">
              Cancel
            </button>
            <button type="button" className="btn btn-sm btn-danger">
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
