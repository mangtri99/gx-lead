
import Select from "react-select";
import { SelectOptions } from "../../config/types";
import { forwardRef } from "react";
import clsx from "clsx";

interface Props extends React.HTMLProps<HTMLSelectElement> {
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (e: any) => void;
  options?: SelectOptions[];
  labelInput?: string | React.ReactNode;
  width?: string;
  message?: string;
  separator?: boolean;
  className?: string;
  isClearable?: boolean;
}

const SelectInput = forwardRef(function SelectInput(props: Props, ref) {
  const {
    value,
    onChange,
    options,
    placeholder,
    labelInput,
    id,
    message,
    separator,
    className,
    width,
    isClearable = true,
    ...rest
  } = props;

  return (
    <label
      htmlFor={id}
      className="fs-14 w-100 position-relative text-secondary"
    >
      {labelInput && <span className="mb-1 d-block">{labelInput}</span>}
      <Select
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref}
        data-testid={id}
        className={clsx("fs-14", {
          "is-invalid": message,
        }, className)}
        options={options}
        value={
          value && options
            ? options.find((option) => option.value === value)
            : ""
        }
        onChange={(e) => {
          let val = e;
          if(!e){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            val = {
              value: "", // used to reset the value
            }
          }
          onChange && onChange(val);
        }}
        placeholder={placeholder}
        isClearable={isClearable}
        styles={{
          container: (base) => ({
            ...base,
            width: width ? width : "100%",
          }),
          control: (base) => ({
            ...base,
            "&:hover": {
              borderColor: "var(--bs-primary)",
              boxShadow: "0 0 0 1px var(--bs-primary)",
            },
            "&:focus": {
              borderColor: "var(--bs-primary)",
              boxShadow: "0 0 0 1px var(--bs-primary)",
            },
            borderColor: message
              ? "var(--bs-danger)"
              : "var(--bs-border-color)",
          }),
          placeholder: (base) => ({
            ...base,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: message ? "var(--bs-danger)" : "var(--bs-secondary-color)",
            fontWeight: 400,
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "white" : "black",
            backgroundColor: state.isSelected ? "var(--bs-primary)" : "white",
            "&:hover": {
              backgroundColor: "var(--bs-primary)",
              color: "white",
            },
            fontWeight: 400,
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: message ? "var(--bs-danger)" : undefined,
          }),
          indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: message
              ? "var(--bs-danger)"
              : "var(--bs-border-color)",
            width: separator ? 1 : 0,
          }),
          singleValue: (base) => ({
            ...base,
            fontWeight: 400,
          }),
        }}
        {...rest}
      />
      {message && (
        <div className="invalid-feedback" id={id}>
          {message}
        </div>
      )}
    </label>
  );
});

export default SelectInput;
