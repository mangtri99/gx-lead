
import Select, {
  IndicatorSeparatorProps,
} from "react-select";
import { SelectOptions } from "../../config/types";
import { forwardRef } from "react";


interface Props extends React.HTMLProps<HTMLSelectElement>{
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void;
  options: SelectOptions[];
  labelInput?: string | React.ReactNode;
}

const SelectInput = forwardRef(function SelectInput(props: Props, ref) {
  const { value, onChange, options, placeholder, labelInput, id, ...rest } = props;
  const indicatorSeparatorStyle = {
    width: 0,
  };

  const IndicatorSeparator = ({ innerProps }: IndicatorSeparatorProps) => {
    return <span style={indicatorSeparatorStyle} {...innerProps} />;
  };


  return (
    <label htmlFor={id} className="fs-14 w-100 position-relative text-secondary">
      {labelInput && <span className="mb-1 d-block">{labelInput}</span>}
      <Select
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref}
        className="fs-14"
        options={options}
        value={value && options ? options.find((option) => option.value === value) : ""}
        onChange={(e) => onChange(e)}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        components={{ IndicatorSeparator }}
        placeholder={placeholder}
        styles={{
          placeholder: (base) => ({
            ...base,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }),
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "white" : "black",
            backgroundColor: state.isSelected ? "#FFC007" : "white",
            "&:hover": {
              backgroundColor: "#FFC007",
              color: "white",
            },
          }),
        }}
        {...rest}
      />
    </label>
  );
});

export default SelectInput;
