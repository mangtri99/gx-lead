import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div className='card bg-white border-0 shadow-sm p-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='fs-20'>Leads Manage</h1>
        <Link to={'/leads/create'}>
        <button className='btn btn-warning' type='button'>
          <span className='me-2'>Add New</span>
          <i className='fa fa-plus'></i>
        </button>
        </Link>
      </div>
    </div>
  )
}
