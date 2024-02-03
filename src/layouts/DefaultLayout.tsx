import { Outlet } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoCubeOutline } from "react-icons/io5";
import { LuArchive } from "react-icons/lu";

import Logo2 from "../assets/logo2.svg";

import "./layout.style.scss";
import MenuLink from "../components/Menu/MenuLink";
import Navbar from "../components/Navbar";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen d-flex">
      {/* Sidebar */}
      <div
        className="bg-white d-flex flex-column"
        style={{
          width: "250px",
          height: "100vh",
          padding: "1rem",
        }}
      >
        <div className="text-center">
          <img src={Logo2} alt="Logo" />
        </div>
        <div className="flex-1 mt-5">
          <p className="menu-title uppercase mb-3">Leads Management</p>
          <ul className="list-unstyled">
            <li className="menu-item">
              <MenuLink
                to="/"
                title="Dashboard"
                icon={<LuLayoutDashboard size={24} />}
              />
            </li>
            <li className="menu-item">
              <MenuLink
                to="/leads"
                title="Leads"
                icon={<IoCubeOutline size={24} />}
              />
            </li>
            <li className="menu-item">
              <MenuLink
                to="/setting"
                title="Leads Settings"
                icon={<LuArchive size={24} />}
              />
            </li>
          </ul>
        </div>
      </div>
      {/* Main */}
      <div className="w-100">
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
