import React from 'react'
import Card from '../Card/Card'
import clsx from 'clsx';
import { IoChevronUp } from 'react-icons/io5';

interface Props {
  value: boolean;
  children: React.ReactNode;
  handleOpen: (val: boolean) => void;
  title: string | React.ReactNode;
  icon?: React.ReactNode;
}

export default function Accordion(props: Props) {
  const { value, children, title, icon, handleOpen } = props;
  return (
    <Card className={clsx('text-neutral-700 accordion', {
      'show': value
    })}>
      <a
        role="button"
        className="accordion-head d-flex justify-content-between align-items-center p-3"
        onClick={() => handleOpen(!value)}
      >
        <div className="d-flex align-items-center fw-semibold">
          {title}
        </div>
        <div className="accordion-btn">
          {icon ? icon : <IoChevronUp data-testid='chevron-icon' size={20} />}
        </div>
      </a>
      <div className='accordion-content'>
        {children}
      </div>
    </Card>
  )
}


