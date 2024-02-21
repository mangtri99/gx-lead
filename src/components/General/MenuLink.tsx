import clsx from "clsx";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  to: string;
  title: string;
  icon?: React.ReactNode;
  isShowSidebar?: boolean;
}

function MenuLink(props: Props) {
  const { to, icon, title, isShowSidebar } = props;
  const location = useLocation();
  return (
    <Link
      to={to}
      className={clsx(
        "menu-item-link d-flex align-items-center",
        {
          active: location.pathname.includes(to) && to !== "/",
        },
        {
          active: location.pathname === to,
        }
      )}
    >
      <span>{icon}</span>
      <span className={`menu-item-link-title text-truncate ${isShowSidebar ? 'visible' : 'invisible'}`}>{title}</span>
    </Link>
  );
}

export default MenuLink;
