import { LuTrash2 } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";

interface Item {
  id: number;
  name: string;
  description: string | null;
}

interface Props {
  item: Item;
  onDelete: (val: number) => void;
  onEdit: (val: number) => void;
}

export default function Card(props: Props) {
  const { item, onDelete, onEdit } = props;
  return (
    <div className="card p-3">
      <div className="row justify-content-between align-items-start">
        <div className="col-auto">
          <p className="mb-0 text-black fs-14">{item.name}</p>
          <p className="mb-0 text-secondary fs-12">{item.description || "-"}</p>
        </div>
        <div className="col-auto d-flex align-items-start">
          <button
            className="d-flex align-items-center me-2"
            type="button"
            onClick={() => onDelete(item.id)}
          >
            <LuTrash2 size={16} className="text-danger" />
          </button>
          <button
            className="d-flex align-items-center"
            type="button"
            onClick={() => onEdit(item.id)}
          >
            <FaRegEdit size={16} className="text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
}