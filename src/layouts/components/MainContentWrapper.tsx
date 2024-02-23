import { useContext, useRef } from "react";
import { LayoutContext } from "../context/LayoutContext";
import Navbar from "../../components/General/Navbar";
import { Outlet } from "react-router-dom";

export default function MainContentWrapper() {
  const mainContent = useRef<HTMLDivElement>(null);
  const { setMarginContent } = useContext(LayoutContext);
  return (
    <div
      ref={mainContent}
      className="w-100 main-content overflow-x-hidden"
      style={{
        marginLeft: setMarginContent(),
      }}
    >
      {/* Navbar */}
      <Navbar />
      {/* Content */}
      <div className="main-content-inner">
        <Outlet />
      </div>
    </div>
  );
}
