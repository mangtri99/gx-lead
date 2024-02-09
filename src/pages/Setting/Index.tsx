import Tabs from "../../components/Tabs/Tabs";
import { LuPlus } from "react-icons/lu";
import useSettingState from "./_hooks/useSettingState";
import SettingItem from "./_components/SettingItem";
import Dialog from "../../components/Dialog/Index";
import TextInput from "../../components/Input/TextInput";
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
import SelectInput from "../../components/Select/SelectInput";
import { SelectOptions } from "../../config/types";
import Button from "../../components/Button/Button";

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
    onDelete,
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
    if (channels) {
      const options = channels.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));
      setChannelOptions(options);
    }
  }, [channels]);

  useEffect(() => {
    console.log("type", types);
  }, [types]);

  return (
    <div>
      <h1 className="mb-0 fs-20 fw-medium text-black">Lead Setting</h1>
      <div className="card bg-white mt-4 p-3 border-0">
        <Tabs
          items={tabs}
          value={tab}
          onChangeTab={(val: string) => {
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
                <SettingItem
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
                <SettingItem
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
                <SettingItem
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
                <SettingItem
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
                <SettingItem
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
                <SettingItem
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
                  <SelectInput
                    labelInput="Select Channel"
                    id="channel"
                    ref={field.ref}
                    options={channelOptions || []}
                    value={field.value ? String(field.value) : ""}
                    onChange={(e) =>
                      field.onChange(
                        e.value === "" ? undefined : Number(e.value)
                      )
                    }
                    onBlur={field.onBlur}
                    placeholder="Select Channel"
                  />
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
                  <SelectInput
                    labelInput="Select Media"
                    id="status"
                    ref={field.ref}
                    options={mediaOptions || []}
                    value={field.value ? String(field.value) : ""}
                    onChange={(e) => {
                      field.onChange(
                        e.value === "" ? undefined : Number(e.value)
                      );
                    }}
                    onBlur={field.onBlur}
                    placeholder="Select Media"
                  />
                )}
              />
            </div>
          )}

          <div className="d-flex justify-content-end">
            <Button type="submit" className="fs-14">
              Save
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Dialog Confirm Delete */}
      <Dialog id="modalConfirmDelete" title="Confirm Delete">
        <div>
          <p className="text-black fs-14">Are you sure to delete this?</p>
          <div className="d-flex align-items-center justify-content-end mt-4">
            <Button
              id="btn-close-confirm-delete"
              type="button"
              size="sm"
              data-bs-dismiss="modal"
              onClick={() => onDelete()}
            >
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDelete()}>
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
