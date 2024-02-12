/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import Accordion from '../../../../components/General/Accordion';
import { LuInfo } from 'react-icons/lu';
import Required from '../../../../components/General/Required';
import { Controller, UseFormReturn } from 'react-hook-form';
import SelectInput from '../../../../components/Input/SelectInput';
import { Option } from '../../../../config/types';
import TextAreaInput from '../../../../components/Input/TextAreaInput';

interface Props {
  form: UseFormReturn<any>
  options: any
}

export default function FormOther(props: Props) {
  const { form, options } = props;
  const [openOtherForm, setOpenOtherForm] = useState(true);

  function onChannelChange(val: number) {
    const getMedia = options?.channels?.find((item: Option) => item.id === val);
    if (
      form.getValues("media_id") &&
      !getMedia?.medias?.find(
        (item: Option) => item.id === form.getValues("media_id")
      )
    ) {
      form.setValue("media_id", null);
    }
  }

  function onMediaChange(val: number) {
    const getMedia = options?.channels?.find(
      (item: Option) => item.id === form.getValues("channel_id")
    );
    const getMediaSource = getMedia?.medias?.find(
      (item: Option) => item.id === val
    );
    if (
      form.getValues("source_id") &&
      !getMediaSource?.sources?.find(
        (item: Option) => item.id === form.getValues("source_id")
      )
    ) {
      form.setValue("source_id", null);
    }
  }
  return (
    <div>
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
        <div className="col-12 col-lg-8 fw-semibold fs-14">
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
                    options={options.statuses || []}
                    value={field.value ? String(field.value) : ""}
                    onChange={(e) => {
                      field.onChange(Number(e.value));
                    }}
                    onBlur={field.onBlur}
                    placeholder="Select..."
                    message={form.formState.errors.status_id?.message as string}
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
                    options={options.probabilities || []}
                    value={field.value ? String(field.value) : ""}
                    onChange={(e) => {
                      field.onChange(Number(e.value));
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
                    options={options.types || []}
                    value={field.value ? String(field.value) : ""}
                    onChange={(e) => {
                      field.onChange(Number(e.value));
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
                    options={options.channels || []}
                    value={field.value ? String(field.value) : ""}
                    onChange={(e) => {
                      field.onChange(Number(e.value));
                      onChannelChange(Number(e.value));
                      form.trigger("channel_id");
                    }}
                    onBlur={field.onBlur}
                    placeholder="Select..."
                    message={form.formState.errors.channel_id?.message as string}
                    separator
                  />
                )}
              />
            </div>
          </div>

          {form.getValues("channel_id") &&
            options?.media?.filter(
              (item: any) => item.channel_id === String(form.getValues("channel_id"))
            ).length > 0 && (
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
                          options.media && form.getValues("channel_id")
                            ? options?.media?.filter(
                                (item: any) =>
                                  item.channel_id ===
                                  String(form.getValues("channel_id"))
                              )
                            : []
                        }
                        value={field.value ? String(field.value) : ""}
                        onChange={(e) => {
                          field.onChange(Number(e.value));
                          onMediaChange(Number(e.value));
                          form.trigger("media_id");
                        }}
                        onBlur={field.onBlur}
                        placeholder="Select..."
                        message={form.formState.errors.media_id?.message as string}
                        separator
                      />
                    )}
                  />
                </div>
              </div>
            )}

          {form.getValues("media_id") &&
            options?.sources?.filter(
              (item: any) => item.media_id === String(form.getValues("media_id"))
            ).length > 0 && (
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
                          options.sources && form.getValues("media_id")
                            ? options?.sources?.filter(
                                (item: any) =>
                                  item.media_id ===
                                  String(form.getValues("media_id"))
                              )
                            : []
                        }
                        value={field.value ? String(field.value) : ""}
                        onChange={(e) => {
                          field.onChange(Number(e.value));
                        }}
                        onBlur={field.onBlur}
                        placeholder="Select..."
                        message={form.formState.errors.source_id?.message as string}
                        separator
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Address
                  <Required />{" "}
                </p>
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
        <div className="col-12 col-lg-4"></div>
      </div>
    </Accordion>
  </div>
  )
}
