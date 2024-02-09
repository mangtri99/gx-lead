import clsx from "clsx";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | React.ReactNode;
}

export default function CheckboxInput(props: Props) {
  const { id, className, value, label } = props;
  return (
    <div className="form-check">
      <input
        className={clsx("form-check-input", className)}
        type="checkbox"
        value={value}
        id={id}
        {...props}
      />
      {label && (
        <label htmlFor={id} className="form-check-label fs-12">
          {label}
        </label>
      )}
    </div>
  );
}
