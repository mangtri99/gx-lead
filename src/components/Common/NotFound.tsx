import { FcDeleteDatabase } from "react-icons/fc";
import Card from "../Card/Card";


export default function NotFound() {
  return (
    <Card className='w-10 h-100 p-3 d-flex justify-content-center align-items-center'>
      <FcDeleteDatabase size={48} className="mb-3"/>
      <h1 className="fs-24 text-center">Not Found</h1>
    </Card>
  )
}
