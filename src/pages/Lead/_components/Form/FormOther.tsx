/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import Accordion from "../../../../components/General/Accordion";
import { LuInfo } from "react-icons/lu";
import Required from "../../../../components/General/Required";
import { Controller, UseFormReturn } from "react-hook-form";
import SelectInput from "../../../../components/Input/SelectInput";
import TextAreaInput from "../../../../components/Input/TextAreaInput";
import { LeadOptionContext } from "../../_hooks/context/LeadOptionContext";

interface Props {
  form: UseFormReturn<any>;
}

export default function FormOther(props: Props) {
  const { form } = props;
  const [openOtherForm, setOpenOtherForm] = useState(true);
  const { channels, media, probabilities, sources, statuses, types } =
    useContext(LeadOptionContext);

  function onChannelChange(val: number | null) {
    const getCurrentMedia = media?.find(
      (item) => item.value === form.getValues("media_id")
    );
    const isOnSameChannel = getCurrentMedia?.channel_id === val;
    const hasChannelMedia =
      media?.filter((item) => item.channel_id === val) || [];
    console.log("hasChannelMedia", hasChannelMedia);

    if (
      (form.getValues("media_id") && !isOnSameChannel) || // if media_id set and not on same channel
      (!form.getValues("media_id") && hasChannelMedia?.length > 0) // if media_id not set and has media on channel
    ) {
      // set null
      form.setValue("media_id", null);
    }
    // if dont have media on channel, set undefined
    if (hasChannelMedia?.length === 0 || val === null) {
      form.setValue("media_id", undefined);
    }
    // also reset source if not on same channel and media
    if (form.getValues("source_id")) {
      onMediaChange(form.getValues("media_id"));
    }
  }

  function onMediaChange(val: number | null) {
    const getCurrentSource = sources?.find(
      (item) => item.value === form.getValues("source_id")
    );
    const isOnSameMedia = getCurrentSource?.media_id === val;
    const hasMediaSource =
      sources?.filter((item) => item.media_id === val) || [];

    if (
      (form.getValues("source_id") && !isOnSameMedia) || // if source_id set and not on same media
      (!form.getValues("source_id") && hasMediaSource?.length > 0) // if source_id not set and has source on media
    ) {
      // set null
      form.setValue("source_id", null);
    }
    if (hasMediaSource?.length === 0 || val === null) {
      form.setValue("source_id", undefined);
    }
  }
  return (
    <div className="mb-5">
      <Accordion
        title={
          <>
            <LuInfo size={20} />
            <span className="ms-2 fs-18">Other Information</span>
          </>
        }
        value={openOtherForm}
        handleOpen={(val) => setOpenOtherForm(val)}
      >
        <div className="row">
          <div className="col-12 col-lg-7 fw-semibold fs-14">
            {/* Status */}
            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Status <Required />{" "}
                </p>
              </div>
              <div className="col-sm-8 col-12">
                <Controller
                  control={form.control}
                  name="status_id"
                  render={({ field }) => (
                    <SelectInput
                      id="status"
                      ref={field.ref}
                      options={statuses || []}
                      value={field.value ? String(field.value) : ""}
                      onChange={(e) => {
                        field.onChange(e.value ? Number(e.value) : null);
                      }}
                      onBlur={field.onBlur}
                      placeholder="Select..."
                      message={
                        form.formState.errors.status_id?.message as string
                      }
                      separator
                    />
                  )}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Probability <Required />{" "}
                </p>
              </div>
              <div className="col-sm-8 col-12">
                <Controller
                  control={form.control}
                  name="probability_id"
                  render={({ field }) => (
                    <SelectInput
                      id="probability"
                      ref={field.ref}
                      options={probabilities || []}
                      value={field.value ? String(field.value) : ""}
                      onChange={(e) => {
                        field.onChange(e.value ? Number(e.value) : null);
                      }}
                      onBlur={field.onBlur}
                      placeholder="Select..."
                      message={
                        form.formState.errors.probability_id?.message as string
                      }
                      separator
                    />
                  )}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Lead Type <Required />{" "}
                </p>
              </div>
              <div className="col-sm-8 col-12">
                <Controller
                  control={form.control}
                  name="type_id"
                  render={({ field }) => (
                    <SelectInput
                      id="type"
                      ref={field.ref}
                      options={types || []}
                      value={field.value ? String(field.value) : ""}
                      onChange={(e) => {
                        field.onChange(e.value ? Number(e.value) : null);
                      }}
                      onBlur={field.onBlur}
                      placeholder="Select..."
                      message={form.formState.errors.type_id?.message as string}
                      separator
                    />
                  )}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Lead Channel <Required />{" "}
                </p>
              </div>
              <div className="col-sm-8 col-12">
                <Controller
                  control={form.control}
                  name="channel_id"
                  render={({ field }) => (
                    <SelectInput
                      id="channel"
                      ref={field.ref}
                      options={channels || []}
                      value={field.value ? String(field.value) : ""}
                      onChange={(e) => {
                        field.onChange(e.value ? Number(e.value) : null);
                        onChannelChange(e.value ? Number(e.value) : null);
                        form.trigger("channel_id");
                      }}
                      onBlur={field.onBlur}
                      placeholder="Select..."
                      message={
                        form.formState.errors.channel_id?.message as string
                      }
                      separator
                    />
                  )}
                />
              </div>
            </div>

            {form.getValues("channel_id") &&
            media &&
            media.filter(
              (item) => item.channel_id === form.getValues("channel_id")
            ).length > 0 ? (
              <div className="row mb-3">
                <div className="col-sm-4 col-12 text-neutral-700">
                  <p>
                    Lead Media <Required />{" "}
                  </p>
                </div>
                <div className="col-sm-8 col-12">
                  <Controller
                    control={form.control}
                    name="media_id"
                    render={({ field }) => (
                      <SelectInput
                        id="media"
                        ref={field.ref}
                        options={
                          media && form.getValues("channel_id")
                            ? media?.filter(
                                (item) =>
                                  item.channel_id ===
                                  form.getValues("channel_id")
                              )
                            : []
                        }
                        value={field.value ? String(field.value) : ""}
                        onChange={(e) => {
                          field.onChange(e.value ? Number(e.value) : null);
                          onMediaChange(e.value ? Number(e.value) : null);
                          form.trigger("media_id");
                        }}
                        onBlur={field.onBlur}
                        placeholder="Select..."
                        message={
                          form.formState.errors.media_id?.message as string
                        }
                        separator
                      />
                    )}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            {form.getValues("media_id") &&
            sources &&
            sources?.filter(
              (item) => item.media_id === form.getValues("media_id")
            ).length > 0 ? (
              <div className="row mb-3">
                <div className="col-sm-4 col-12 text-neutral-700">
                  <p>
                    Lead Source <Required />{" "}
                  </p>
                </div>
                <div className="col-sm-8 col-12">
                  <Controller
                    control={form.control}
                    name="source_id"
                    render={({ field }) => (
                      <SelectInput
                        id="source"
                        ref={field.ref}
                        options={
                          sources && form.getValues("media_id")
                            ? sources?.filter(
                                (item) =>
                                  item.media_id === form.getValues("media_id")
                              )
                            : []
                        }
                        value={field.value ? String(field.value) : ""}
                        onChange={(e) => {
                          field.onChange(e.value ? Number(e.value) : null);
                        }}
                        onBlur={field.onBlur}
                        placeholder="Select..."
                        message={
                          form.formState.errors.source_id?.message as string
                        }
                        separator
                      />
                    )}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* Notes */}
            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>Address</p>
              </div>
              <div className="col-sm-8 col-12">
                <TextAreaInput
                  {...form.register("notes")}
                  id="notes"
                  placeholder="e.g. Leads Note"
                  message={form.formState.errors.notes?.message as string}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5"></div>
        </div>
      </Accordion>
    </div>
  );
}
