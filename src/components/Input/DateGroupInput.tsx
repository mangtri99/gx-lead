import React from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import SingleDatePickerInput from "./SingleDatePickerInput";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  dateValueStart?: Date;
  dateValueEnd?: Date;
  onChangeDateStart?: SelectSingleEventHandler;
  onChangeDateEnd?: SelectSingleEventHandler;
  label?: string | React.ReactNode;
  separator?: string | React.ReactNode;
  placeholderDateStart?: string;
  placeholderDateEnd?: string;
}

export default function DateGroupInput(props: Props) {
  const {
    label,
    id,
    placeholderDateStart,
    placeholderDateEnd,
    onChangeDateStart,
    onChangeDateEnd,
    separator,
    dateValueStart,
    dateValueEnd,
  } = props;
  return (
    <label htmlFor={id}>
      {label && <span className="fs-12">{label}</span>}
      <div className="d-flex">
        <div className="input-group">
          <SingleDatePickerInput
            id={id}
            className="form-control-sm"
            selectedValue={dateValueStart}
            handleChange={onChangeDateStart}
            placeholder={placeholderDateStart}
            style={{
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
            wrapperStyle={{
              width: '45%'
            }}
          />
          <span
            className="input-group-text"
            style={{
              fontSize: "11px",
              backgroundColor: "#E8E8E8",
            }}
          >
            {separator || "to"}
          </span>
          <SingleDatePickerInput
            id={id}
            className="form-control-sm"
            selectedValue={dateValueEnd}
            handleChange={onChangeDateEnd}
            placeholder={placeholderDateEnd}
            style={{
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
            wrapperStyle={{
              width: '45%'
            }}
          />
        </div>
      </div>
    </label>
  );
}
