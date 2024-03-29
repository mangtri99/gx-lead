import { forwardRef } from "react";
import MenuLink from "./MenuLink";
import { LuArchive, LuLayoutDashboard } from "react-icons/lu";
import Logo2 from "@/assets/images/logo2.svg";
import LogoCircle from "@/assets/images/logo.jpeg";
import { IoCubeOutline } from "react-icons/io5";
import {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
  VERSION_APP,
} from "../../config/general";

interface Props {
  isShow?: boolean;
}

const Sidebar = forwardRef(function Sidebar(props: Props, ref) {
  const { isShow } = props;

  return (
    <div
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ref={ref}
      className="bg-white d-flex flex-column h-100 p-3 w-aside"
      style={{
        width: isShow ? `${SIDEBAR_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`,
      }}
    >
      <div className="text-center">
        {isShow ? (
          <img style={{
            width: "172px",
          }} src={Logo2} alt="Logo" />
        ) : (
          <img
            src={LogoCircle}
            alt="Logo"
            className="pt-2"
            style={{
              width: "32px",
            }}
          />
        )}
      </div>
      <div className="flex-1 mt-5">
        <p
          className={`text-truncate menu-title uppercase mb-3 ${
            isShow ? "visible" : "invisible"
          }`}
        >
          Leads Management
        </p>
        <ul className="list-unstyled">
          <li className="menu-item">
            <MenuLink
              to="/"
              title="Dashboard"
              icon={<LuLayoutDashboard size={24} />}
              isShowSidebar={isShow}
            />
          </li>
          <li className="menu-item">
            <MenuLink
              to="/leads"
              title="Leads"
              icon={<IoCubeOutline size={24} />}
              isShowSidebar={isShow}
            />
          </li>
          <li className="menu-item">
            <MenuLink
              to="/setting"
              title="Leads Settings"
              icon={<LuArchive size={24} />}
              isShowSidebar={isShow}
            />
          </li>
        </ul>
      </div>
      <div className="text-center">
        <div className={`text-secondary fs-12 fw-medium d-flex align-items-center justify-content-center ${isShow ? 'flex-lg-row ' : 'flex-column'}`}>
          <p className={isShow ? 'me-1' : 'me-0'}>Version</p>
          <p>{VERSION_APP}</p>
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
