import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  dateValueStart?: string;
  dateValueEnd?: string;
  onChangeDateStart?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDateEnd?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string | React.ReactNode;
  separator?: string | React.ReactNode;
  placeholderDateStart?: string;
  placeholderDateEnd?: string;
}

export default function MultiDateInput(props: Props) {
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
      {label && (
        <span className="fs-12">
          {label}
        </span>
      )}
      <div className="d-flex">
        <div className="input-group">
          <input
            id={id}
            value={dateValueStart || ""}
            onChange={(e) => onChangeDateStart && onChangeDateStart(e)}
            type="date"
            className="form-control form-control-sm fs-14"
            aria-label="Date start"
            placeholder={placeholderDateStart}
          />
          <span
            className="input-group-text"
            style={{
              fontSize: "12px",
              backgroundColor: "#E8E8E8",
            }}
          >
            {separator || "to"}
          </span>
          <input
            value={dateValueEnd || ""}
            onChange={(e) => onChangeDateEnd && onChangeDateEnd(e)}
            type="date"
            className="form-control form-control-sm fs-14"
            aria-label="Date end"
            placeholder={placeholderDateEnd}
          />
        </div>
      </div>
    </label>
  );
}
