import React, { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | React.ReactNode;
  
}

const RadioInput = forwardRef(function RadioInput(props: Props, ref) {
  const { id, className, label } = props;
  return (
    <div className="form-check">
      <input
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ref={ref}
        className={`form-check-input ${className}`}
        type="radio"
        id={id}
        {...props}
      />
      {label && (
        <label htmlFor={id} className="form-check-label fs-12">
          {label}
        </label>
      )}
    </div>
  )
})

export default RadioInput;
