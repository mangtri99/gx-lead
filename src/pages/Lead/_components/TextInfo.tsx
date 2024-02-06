import React from 'react'

interface Props {
  title: string;
  value?: React.ReactNode | string;
}

export default function TextInfo(props: Props) {
  return (
    <div className="row">
      <div
        className="text-neutral-300 col-12 col-lg-4"
      >
        <p className="mb-0">
          {props.title}
        </p>
      </div>
      <div className="col-12 col-lg-8">
        <p className="text-black fw-medium mb-0">
          {props.value}
        </p>
      </div>
    </div>
  )
}
