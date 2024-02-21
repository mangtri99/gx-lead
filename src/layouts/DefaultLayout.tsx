import { Navigate, Outlet } from "react-router-dom";
import {useMedia} from 'react-use';

import Navbar from "../components/General/Navbar";
import { useAuth } from "../composables/useAuth";
import { useRef, useState } from "react";
import Sidebar from "../components/General/Sidebar";
import { LayoutContext } from "./context/LayoutContext";
import { SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH} from "../config/general";

export default function DefaultLayout() {
  const isMobile = useMedia('(max-width: 992px)');
  const mainContent = useRef<HTMLDivElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);
  const [isShowSidebar, setIsShowSidebar] = useState(true)

  function setMarginContent(){
    if(isMobile){
      return '0px'
    } else if (!isMobile && isShowSidebar){
      return `${SIDEBAR_WIDTH}px`
    } else {
      return `${SIDEBAR_COLLAPSED_WIDTH}px`
    }
  }

  const { user } = useAuth();
  // if not login, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <LayoutContext.Provider value={{
      isShowSidebar,
      setIsShowSidebar,
      setMarginContent,
    }}>
      <div className="min-h-screen d-flex">

        {/* Desktop */}
        <div ref={sidebar} className="d-none d-lg-block sidebar-wrapper-desktop" style={{
          width: isShowSidebar ? `${SIDEBAR_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`
        }}>
          <Sidebar isShow={isShowSidebar} />
        </div>

        {/* Mobile */}
        <div className="d-lg-none d-block">
          <div
            className="offcanvas offcanvas-start"
            style={{
              width: `${SIDEBAR_WIDTH}px`
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

        {/* Main */}
        <div ref={mainContent} className="w-100 main-content overflow-x-hidden" style={{
          marginLeft: setMarginContent()
        }}>
          {/* Navbar */}
          <Navbar />
          {/* Content */}
          <div
            className="main-content-inner"
          >
            <Outlet/>
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
