import { FcDeleteDatabase } from "react-icons/fc";


export default function NotFound() {
  return (
    <div className='card w-10 h-100 p-3 d-flex justify-content-center align-items-center'>
      <FcDeleteDatabase size={48} className="mb-3"/>
      <h1 className="fs-24 text-center">Not Found</h1>
    </div>
  )
}
