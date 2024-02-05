import { useEffect, useState } from "react";
import { GoBell } from "react-icons/go";
import { IoMenu } from "react-icons/io5";
import Profile from "../assets/user.png";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [title, setTitle] = useState("Dashboard");
  const location = useLocation();
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
    <div className="bg-white shadow-sm p-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <button className="btn">
            <IoMenu size={24} />
          </button>
          <p className="nav-title ms-3">
            {title}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <button className="btn">
            <GoBell size={24} />
          </button>
          <div className="dropdown">
            <button
              className="btn"
              type="button"
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
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
