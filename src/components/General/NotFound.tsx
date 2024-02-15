import { FcDeleteDatabase } from "react-icons/fc";
import Card from "../Card/Card";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  description?: string;
}

export default function NotFound(props: Props) {
  const { title, description } = props;
  const navigate = useNavigate();
  return (
    <Card className='w-10 h-100 p-3 d-flex justify-content-center align-items-center'>
      <FcDeleteDatabase size={48} className="mb-3"/>
      <h1 className="fs-24 text-center">{title || 'Not Found'}</h1>
      <p className="text-secondary text-center">{description || ''}</p>
      <Button className="mt-3" onClick={() => navigate('/')}>Home</Button>
    </Card>
  )
}
