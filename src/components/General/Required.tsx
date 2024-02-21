import React from 'react'

interface Props {
  children?: React.ReactNode;
  className?: string;
}
export default function Required(props: Props) {
  const { children, className } = props;
  return (
    <span className={`text-danger ${className}`}>
      {children || '*'}
    </span>
  )
}
