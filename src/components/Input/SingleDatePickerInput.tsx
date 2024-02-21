import { useEffect, useState } from "react";
import ButtonActionIcon from "../Button/ButtonActionIcon";
import "react-day-picker/dist/style.css";
import { MdOutlineDateRange } from "react-icons/md";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import dayjs from "dayjs";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  selectedValue?: Date;
  handleChange?: SelectSingleEventHandler;
  label?: string | React.ReactNode;
  wrapperStyle?: React.CSSProperties;
}

const SingleDatePickerInput = (props: Props) => {
  const {
    type,
    id,
    placeholder,
    selectedValue,
    handleChange,
    className,
    wrapperStyle,
    ...inputProps
  } = props;

  const [labelValue, setLabelValue] = useState("");

  useEffect(() => {
    let dateValue = "";
    if (selectedValue) {
      dateValue = dayjs(selectedValue).format("DD/MM/YYYY");
      setLabelValue(dateValue);
    } else {
      setLabelValue("");
    }
  }, [selectedValue]);

  return (
    <div className="position-relative" style={wrapperStyle}>
      <input
        type={type || "text"}
        id={id}
        className={`form-control fs-14 position-relative ${className}`}
        placeholder={placeholder || ""}
        readOnly
        value={labelValue}
        {...inputProps}
      />
      <div className="position-absolute inset-0 bg-transparent">
        <div className="dropdown w-100 h-100">
          <ButtonActionIcon
            className="d-block w-100 h-100 position-relative"
            type="button"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <div
              className="position-absolute"
              style={{
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            >
              <MdOutlineDateRange size={20} />
            </div>
          </ButtonActionIcon>
          <ul className="dropdown-menu">
            <DayPicker
              id="datepicker"
              mode="single"
              selected={selectedValue}
              onSelect={handleChange}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleDatePickerInput;
