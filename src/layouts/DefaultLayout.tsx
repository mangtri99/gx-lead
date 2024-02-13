import { Navigate, Outlet } from "react-router-dom";
import {useMedia} from 'react-use';

import Navbar from "../components/General/Navbar";
import { useAuth } from "../composables/useAuth";
import { useRef, useState } from "react";
import Sidebar from "../components/General/Sidebar";
import { LayoutContext } from "./context/LayoutContext";

export default function DefaultLayout() {
  const isMobile = useMedia('(max-width: 992px)');
  const mainContent = useRef<HTMLDivElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);
  const [isShowSidebar, setIsShowSidebar] = useState(true)
  const { user } = useAuth();
  // if not login, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <LayoutContext.Provider value={{
      isShowSidebar,
    }}>
      <div className="min-h-screen d-flex">

        {/* Desktop */}
        <div ref={sidebar} className="d-none d-lg-block position-fixed h-100" style={{
          transform: isShowSidebar ? 'translateX(0px)' : 'translateX(-250px)'
        }}>
          <Sidebar />
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
        <div ref={mainContent} className="w-100 main-content" style={{
          marginLeft: isShowSidebar && !isMobile ? '250px' : '0px'
        }}>
          {/* Navbar */}
          <Navbar toggleSidebar={() => setIsShowSidebar(!isShowSidebar)} />
          {/* Content */}
          <div
            className="w-100 p-3"
          >
            <Outlet />
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
