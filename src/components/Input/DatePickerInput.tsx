import { useEffect, useState } from "react";
import ButtonActionIcon from "../Button/ButtonActionIcon";
import "react-day-picker/dist/style.css";
import { MdOutlineDateRange } from "react-icons/md";
import {
  DayPicker,
  SelectRangeEventHandler,
} from "react-day-picker";
import dayjs from "dayjs";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  selectedValue: {
    from: Date | undefined;
    to: Date | undefined;
  };
  handleChange: SelectRangeEventHandler;
}

const DatePickerInput = (props: Props) => {
  const {
    label,
    type,
    id,
    placeholder,
    selectedValue,
    handleChange,
    ...inputProps
  } = props;

  const [labelValue, setLabelValue] = useState("");

  useEffect(() => {
    let dateFrom = "";
    let dateTo = "";
    if (selectedValue.from) {
      dateFrom = dayjs(selectedValue.from).format("DD/MM/YYYY");
    }
    if (selectedValue.to) {
      dateTo = dayjs(selectedValue.to).format("DD/MM/YYYY");
    }
    if (dateTo) {
      setLabelValue(`${dateFrom} - ${dateTo}`);
    } else {
      setLabelValue(dateFrom);
    }
  }, [selectedValue]);


  return (
    <>
      <label
        className="fs-14 w-100 position-relative text-secondary"
        htmlFor={id}
      >
        {label && <span className="mb-1 d-block">{label}</span>}
        <input
          type={type || "text"}
          id={id}
          className='form-control fs-14'
          placeholder={placeholder || ""}
          readOnly
          value={labelValue}
          {...inputProps}
        />
        <div
          className="position-absolute inset-0 bg-transparent"
        >
          <div className="dropdown w-100 h-100">
            <ButtonActionIcon
              className="d-block w-100 h-100 position-relative"
              type="button"
              data-bs-toggle="dropdown"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <div className="position-absolute" style={{
                top: "50%",
                right: "10px",
              }}>
                <MdOutlineDateRange size={20} />
              </div>
            </ButtonActionIcon>
            <ul className="dropdown-menu">
              <DayPicker
                id="datepicker"
                mode="range"
                selected={selectedValue}
                onSelect={handleChange}
              />
            </ul>
          </div>
        </div>
      </label>
    </>
  );
};

export default DatePickerInput;
