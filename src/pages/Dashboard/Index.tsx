import React from 'react'
import CardWidget from '../../components/CardWidget'
import useChartState from './_hooks/useChartState'

export default function Index() {
  const { data } = useChartState()
  return (
    <div>
      <div className='d-flex flex-lg-row flex-column justify-content-lg-between align-items-lg-center'>
        <h1 className='fw-bold fs-20'>Lead Summary</h1>
        <div className='align-items-center'>

        </div>
      </div>
      <div className='row'>
        <div className='col-6 col-md-4 col-lg-2 mb-3'>
            <CardWidget title={data?.data.leads.total} subtitle='Leads' />
        </div>
        {data?.data.statuses.map((status, index: number) => (
          <div className='col-6 col-md-4 col-lg-2 mb-3' key={index}>
            <CardWidget title={status.total} subtitle={status.name} />
          </div>
        ))}
      </div>
    </div>
  )
}
