import clsx from "clsx";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string
  disabled?: boolean;
}

export default function ButtonActionIcon(props: Props) {
  const { children, className, disabled, type,...rest } = props;
  return (
    <button
      type={type || "button"}
      className={clsx( className)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
