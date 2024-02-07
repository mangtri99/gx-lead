
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
}

const SelectInput = forwardRef(function SelectInput(props: Props, ref) {
  const { value, onChange, options, placeholder } = props;
  const indicatorSeparatorStyle = {
    width: 0,
  };

  const IndicatorSeparator = ({ innerProps }: IndicatorSeparatorProps) => {
    return <span style={indicatorSeparatorStyle} {...innerProps} />;
  };


  return (
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
    />
  );
});

export default SelectInput;
