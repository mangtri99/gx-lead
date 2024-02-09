import { forwardRef } from "react";
import MenuLink from "./MenuLink";
import { LuArchive, LuLayoutDashboard } from "react-icons/lu";
import Logo2 from "@/assets/images/logo2.svg";
import { IoCubeOutline } from "react-icons/io5";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Sidebar = forwardRef(function Sidebar(_props, ref) {
  return (
    <div
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ref={ref}
      className="bg-white d-flex flex-column h-100"
      style={{
        width: "250px",
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
  );
});

export default Sidebar;
