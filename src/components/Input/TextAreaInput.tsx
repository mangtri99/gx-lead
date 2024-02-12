import clsx from "clsx";
import React, { forwardRef } from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string | React.ReactNode;
  className?: string;
  message?: string;
}

const TextAreaInput = forwardRef(function TextAreaInput(props: Props, ref) {
  const { id, className, label, message, ...rest } = props;
  return (
    <label
      htmlFor={id}
      className="fs-14 w-100 position-relative text-secondary"
    >
      {label && <span className="mb-1 d-block">{label}</span>}
      <textarea
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ref={ref}
        className={clsx("form-control fs-14", className, {
          "is-invalid": message,
        })}
        id={id}
        rows={3}
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

export default TextAreaInput;
