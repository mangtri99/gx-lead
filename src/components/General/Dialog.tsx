import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  id: string;
  size?: "sm" | "lg" | "xl";
}

export default function Dialog(props: Props) {
  const { children, id, title, size } = props;
  const sizeClass = size ? `modal-${size}` : "";
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className={`modal-dialog modal-dialog-centered ${sizeClass}`}>
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title mb-0 fs-5" id={`${id}Label`}>
              {title}
            </p>
            <button
              id={`btn-close-${id}`}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}
