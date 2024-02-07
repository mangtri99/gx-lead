import { useEffect, useState } from "react";
import TextInput from "../../../components/TextInput";
import useSettingFormState from "../_hooks/useSettingFormState";
import { MEDIA_URL, SOURCE_URL } from "../../../config/api";
import { Controller } from "react-hook-form";
import SelectInput from "../../../components/Select/Index";
import { SelectOptions } from "../../../config/types";
import useSettingState from "../_hooks/useSettingState";

export default function Form() {
  const { media, sources } = useSettingState();
  const { tab, form, onSubmit, onInvalid } = useSettingFormState();
  const [mediaOptions, setMediaOptions] = useState<SelectOptions[]>();
  const [channelOptions, setChannelOptions] = useState<SelectOptions[]>();

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
    <form className="w-100" onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
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
      )}

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
  );
}
