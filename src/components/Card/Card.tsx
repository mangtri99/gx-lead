import clsx from 'clsx';
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

function Card(props: Props) {
  const { children, className } = props;
  return (
    <div className={clsx('card bg-white border-0 shadow-sm', className)}>
      {children}
    </div>
  )
}

function Body (props: Props) {
  const { children, className } = props;
  return (
    <div className={clsx('card-body', className)}>
      {children}
    </div>
  )
}

Card.Body = Body;

export default Card;
