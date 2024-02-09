import clsx from "clsx";
import { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
  label?: string;
  error?: boolean;
  message?: string;
  children?: React.ReactNode;
}

const TextInput = forwardRef(function TextInput(props: Props, ref) {
  const { label, children, error, type, id, placeholder, message, className, ...inputProps } = props;
  return (
    <label className="form-label fs-14 w-100 position-relative" htmlFor={id}>
      {label || children}
      <input
        {...inputProps}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ref={ref}
        type={type || "text"}
        id={id}
        className={
          clsx(`form-control ${className}`, {
            "is-invalid": error
          })
        }
        placeholder={placeholder || ""}
        style={{
          marginTop: "4px",
          fontSize: "14px"
        }}
      />
      <div className="invalid-feedback" id={id}>
        {message}
      </div>
    </label>
  );
});

export default TextInput;