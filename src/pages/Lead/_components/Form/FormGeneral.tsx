/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Accordion from "../../../../components/General/Accordion";
import { LuHome } from "react-icons/lu";
import Required from "../../../../components/General/Required";
import { Controller, UseFormReturn } from "react-hook-form";
import SelectInput from "../../../../components/Input/SelectInput";
import TextInput from "../../../../components/Input/TextInput";
import TextAreaInput from "../../../../components/Input/TextAreaInput";
import RadioInput from "../../../../components/Input/RadioInput";
import { SelectOptions } from "../../../../config/types";
import GoogleMaps from "../../../../components/General/GoogleMaps";
import { INITIAL_CENTER_MAP } from "../../../../config/general";

interface Props {
  form: UseFormReturn<any>;
  options: any;
}

export default function FormGeneral(props: Props) {
  const { form, options } = props;
  const [openGeneralForm, setOpenGeneralForm] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(INITIAL_CENTER_MAP);
  const onChangePositionMarker = (e: google.maps.MapMouseEvent) => {
    form.setValue("latitude", e.latLng?.lat().toString());
    form.setValue("longitude", e.latLng?.lng().toString());
    form.trigger("latitude");
    form.trigger("longitude");
  };

  // set current position on first load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <div className="mb-4">
      {/* General */}
      <Accordion
        title={
          <>
            <LuHome size={20} />
            <span className="ms-2 fs-18">General</span>
          </>
        }
        value={openGeneralForm}
        handleOpen={(val) => setOpenGeneralForm(val)}
      >
        <div className="row g-2 justify-content-between">
          <div className="col-12 col-lg-7 fw-semibold fs-14">
            {/* Branch */}
            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Branch Office <Required />{" "}
                </p>
              </div>
              <div className="col-sm-7 col-12">
                <Controller
                  control={form.control}
                  name="branch_id"
                  render={({ field }) => (
                    <SelectInput
                      id="branch"
                      ref={field.ref}
                      options={options.branches || []}
                      value={field.value ? String(field.value) : ""}
                      onChange={(e) => {
                        field.onChange(Number(e.value));
                      }}
                      onBlur={field.onBlur}
                      placeholder="Select Branch"
                      separator
                      message={
                        form.formState.errors.branch_id?.message as string
                      }
                    />
                  )}
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Full Name
                  <Required />{" "}
                </p>
              </div>
              <div className="col-sm-7 col-12">
                <TextInput
                  {...form.register("fullname")}
                  id="fullname"
                  type="text"
                  placeholder="e.g. Arbianto Salampesi"
                  message={form.formState.errors.fullname?.message as string}
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Company Name
                  <Required />{" "}
                </p>
              </div>
              <div className="col-sm-7 col-12">
                <TextInput
                  {...form.register("company_name")}
                  id="company_name"
                  type="text"
                  placeholder="e.g. Global Xtreme"
                  message={
                    form.formState.errors.company_name?.message as string
                  }
                />
              </div>
            </div>

            {/* Address */}
            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Address
                  <Required />{" "}
                </p>
              </div>
              <div className="col-sm-7 col-12">
                <TextAreaInput
                  {...form.register("address")}
                  id="address"
                  placeholder="e.g. Jl Raya Kerobokan"
                  message={form.formState.errors.address?.message as string}
                />
              </div>
            </div>

            {/* Email */}
            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Email
                  <Required />{" "}
                </p>
              </div>
              <div className="col-sm-7 col-12">
                <TextInput
                  {...form.register("email")}
                  id="email"
                  type="email"
                  placeholder="e.g arbimdy@gmail.com"
                  message={form.formState.errors.email?.message as string}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Phone Number
                  <Required />{" "}
                </p>
              </div>
              <div className="col-sm-7 col-12">
                <TextInput
                  {...form.register("phone_number")}
                  id="phone_number"
                  type="tel"
                  placeholder="e.g 081123001002"
                  message={
                    form.formState.errors.phone_number?.message as string
                  }
                />
              </div>
            </div>

            {/* Latitude & Longitude */}
            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Latitude & Longitude
                  <Required />{" "}
                </p>
              </div>
              <div className="col-sm-7 col-12">
                <div className="row g-2">
                  <div className="col-6">
                    <TextInput
                      {...form.register("latitude")}
                      id="latitude"
                      type="text"
                      placeholder="e.g -8.12341"
                      message={
                        form.formState.errors.latitude?.message as string
                      }
                    />
                  </div>
                  <div className="col-6">
                    <TextInput
                      {...form.register("longitude")}
                      id="longitude"
                      type="text"
                      placeholder="e.g 115.12334"
                      message={
                        form.formState.errors.longitude?.message as string
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Is Coverage */}
            <div className="row mb-3">
              <div className="col-sm-4 col-12 text-neutral-700">
                <p>
                  Is Coverage
                  <Required />{" "}
                </p>
              </div>
              <div className="col-sm-7 col-12">
                <div className="row">
                  {options.coverages?.map((coverage: SelectOptions) => (
                    <div className="col-auto" key={coverage.value}>
                      <RadioInput
                        {...form.register("is_coverage")}
                        id={`is_coverage_${coverage.value}`}
                        value={coverage.value}
                        label={coverage.label}
                        defaultChecked={Number(coverage.value) === 1}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 d-flex justify-content-end">
            <GoogleMaps
              onMarkerDragEnd={onChangePositionMarker}
              onClickMap={onChangePositionMarker}
              markers={
                form.getValues("latitude") && form.getValues("longitude")
                  ? {
                      lat: Number(form.getValues("latitude")),
                      lng: Number(form.getValues("longitude")),
                    }
                  : currentPosition
              }
            />
          </div>
        </div>
      </Accordion>
    </div>
  );
}
