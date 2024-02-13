import clsx from "clsx";
import React, { forwardRef } from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string
  disabled?: boolean;
}

const ButtonActionIcon = forwardRef(function ButtonActionIcon(props: Props, ref) {
  const { children, className, disabled, type,...rest } = props;
  return (
    <button
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={ref}
      type={type || "button"}
      className={clsx( className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
})

export default ButtonActionIcon
