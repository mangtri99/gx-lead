import clsx from 'clsx';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  to: string;
  title: string;
  icon?: React.ReactNode;
}

function MenuLink(props: Props) {
  const { to, icon, title } = props
  const location = useLocation()
  return (
    <Link to={to} className={clsx('menu-item-link d-flex align-items-center', {
      'active': location.pathname.includes(to) && to !== '/',
    }, {
      'active': location.pathname === to,
    })}>
      {icon}
      <span className="ms-3">
        {title}
      </span>
    </Link>
  )
}

export default MenuLink