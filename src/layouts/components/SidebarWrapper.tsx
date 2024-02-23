import React, { useContext } from "react";
import Sidebar from "../../components/General/Sidebar";
import { LayoutContext } from "../context/LayoutContext";
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from "../../config/general";

export default function SidebarWrapper() {
  const sidebar = React.useRef<HTMLDivElement>(null);
  const { isShowSidebar } = useContext(LayoutContext);
  return (
    <>
      {/* Desktop */}
      <div
        ref={sidebar}
        className="d-none d-lg-block sidebar-wrapper-desktop"
        style={{
          width: isShowSidebar
            ? `${SIDEBAR_WIDTH}px`
            : `${SIDEBAR_COLLAPSED_WIDTH}px`,
        }}
      >
        <Sidebar isShow={isShowSidebar} />
      </div>

      {/* Mobile */}
      <div className="d-lg-none d-block">
        <div
          className="offcanvas offcanvas-start"
          style={{
            width: `${SIDEBAR_WIDTH}px`,
          }}
          tabIndex={-1}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header d-flex justify-content-end">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <Sidebar isShow />
          </div>
        </div>
      </div>
    </>
  );
}
