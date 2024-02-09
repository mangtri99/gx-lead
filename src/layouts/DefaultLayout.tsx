import { Navigate, Outlet } from "react-router-dom";

import "./layout.style.scss";
import Navbar from "../components/Navigation/Navbar";
import { useAuth } from "../composables/useAuth";
import { useRef } from "react";
import Sidebar from "../components/Navigation/Sidebar";

export default function DefaultLayout() {
  const mainContent = useRef<HTMLDivElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  // if not login, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="min-h-screen d-flex">

      {/* Desktop */}
      <div className="d-none d-lg-block position-fixed h-100">
        <Sidebar ref={sidebar} />
      </div>

      {/* Mobile */}
      <div className="d-lg-none d-block">
        <div
          className="offcanvas offcanvas-start"
          style={{
            width: "250px",
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
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Main */}
      <div ref={mainContent} className="w-100 main-content">
        {/* Navbar */}
        <Navbar />
        {/* Content */}
        <div
          className="h-full w-100 p-3"
          style={{
            backgroundColor: "#F5F6F9",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
