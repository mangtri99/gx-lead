import clsx from 'clsx';
import React from 'react'
import { Link } from 'react-router-dom'
import './menu.style.scss'

interface Props {
  to: string;
  title: string;
  icon?: React.ReactNode;
}

function MenuLink(props: Props) {
  const { to, icon, title } = props
  return (
    <Link to={to} className={clsx('menu-item-link d-flex align-items-center', {
      'active': window.location.pathname === to
    })}>
      {icon}
      <span className="ms-3">
        {title}
      </span>
    </Link>
  )
}

export default MenuLink