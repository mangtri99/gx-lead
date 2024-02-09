import clsx from "clsx";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
  size?: "sm" | "lg";
  outline?: boolean;
  disabled?: boolean;
}

export default function Button(props: Props) {
  const { children, className, variant, size, type, disabled, outline,  ...rest } = props;
  let variantClass = variant ? `btn-${variant}` : "btn-primary";
  const sizeClass = size ? `btn-${props.size}` : "";
  if (outline) {
    variantClass = `btn-outline-${variant || "primary"}`;
  }
  return (
    <button
      type={type || "button"}
      className={clsx("btn", className, variantClass, sizeClass)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
