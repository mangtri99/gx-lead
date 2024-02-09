import clsx from "clsx";
import { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  error?: boolean;
  message?: string;
}

const TextInput = forwardRef(function TextInput(props: Props, ref) {
  const {
    label,
    error,
    type,
    id,
    placeholder,
    message,
    className,
    ...inputProps
  } = props;
  return (
    <label className="fs-14 w-100 position-relative text-secondary" htmlFor={id}>
      {label && <span className="mb-1 d-block">{label}</span>}
      <input
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ref={ref}
        type={type || "text"}
        id={id}
        className={clsx(`form-control fs-14`, {
          className,
          "is-invalid": error,
        })}
        placeholder={placeholder || ""}
        {...inputProps}
      />
      {message && (
        <div className="invalid-feedback" id={id}>
          {message}
        </div>
      )}
    </label>
  );
});

export default TextInput;
