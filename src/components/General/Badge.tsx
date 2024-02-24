import clsx from 'clsx';
import React from 'react'

interface Props {
  color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  children: React.ReactNode;
  className?: string;
}

export default function Badge(props: Props) {
  const { color, children, className = '' } = props;
  return (
    <span className={clsx(`badge w-fit ${className}`, {
      'text-bg-primary': color === 'primary',
      'text-bg-secondary': color === 'secondary',
      'text-bg-success': color === 'success',
      'text-bg-danger': color === 'danger',
      'text-bg-warning': color === 'warning',
      'text-bg-info': color === 'info',
      'text-bg-light': color === 'light',
      'text-bg-dark': color === 'dark',
    })}>
      {children}
    </span>
  )
}
