import { useContext, useEffect, useState } from "react";
import { GoBell } from "react-icons/go";
import { IoMenu } from "react-icons/io5";
import Profile from "@/assets/images/user.png";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../composables/useAuth";
import ButtonActionIcon from "../Button/ButtonActionIcon";
import { LayoutContext } from "../../layouts/context/LayoutContext";

export default function Navbar() {
  const { isShowSidebar, setIsShowSidebar, setMarginContent } = useContext(LayoutContext);
  const [title, setTitle] = useState("Dashboard");
  const location = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    switch (location.pathname) {
      case "/leads":
        setTitle("Leads");
        break;
      case "/setting":
        setTitle("Leads Settings");
        break;
      default:
        setTitle("Dashboard");
        break;
    }
  }, [location.pathname]);

  return (
    <div
      className="fixed-top main-content"
      style={{
        marginLeft: setMarginContent(),
      }}
    >
      <div className="w-100 bg-white shadow-sm p-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {/* Desktop */}
            <ButtonActionIcon
              className="d-none d-lg-flex"
              onClick={() => setIsShowSidebar(!isShowSidebar)}
            >
              <IoMenu size={24} />
            </ButtonActionIcon>

            {/* Mobile */}
            <ButtonActionIcon
              className="d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <IoMenu size={24} />
            </ButtonActionIcon>

            <p className="nav-title ms-3">{title}</p>
          </div>
          <div className="d-flex align-items-center">
            <ButtonActionIcon className="p-2 me-2">
              <GoBell size={24} />
            </ButtonActionIcon>
            <div className="dropdown">
              <ButtonActionIcon
                className="p-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={Profile}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  />
                  <RiArrowDropDownFill size={24} />
                </div>
              </ButtonActionIcon>
              <ul className="dropdown-menu">
                <li>
                  <a
                    role="button"
                    className="dropdown-item"
                    onClick={() => logout()}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
