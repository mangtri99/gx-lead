import clsx from 'clsx';
import React from 'react'

interface Props {
  children?: React.ReactNode;
  className?: string;
}
export default function Required(props: Props) {
  const { children, className } = props;
  return (
    <span className={clsx('text-danger', className)}>
      {children || '*'}
    </span>
  )
}
