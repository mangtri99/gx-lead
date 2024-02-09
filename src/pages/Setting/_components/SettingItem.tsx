import { LuTrash2 } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import ButtonActionIcon from "../../../components/Button/ButtonActionIcon";

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

export default function SettingItem(props: Props) {
  const { item, onDelete, onEdit } = props;
  return (
    <div className="card h-100 p-3">
      <div className="row justify-content-between align-items-start">
        <div className="col-9">
          <p className="mb-0 text-black fs-14">{item.name}</p>
          <p className="mb-0 text-secondary fs-12">{item.description || "-"}</p>
        </div>
        <div className="col-3 d-flex align-items-start justify-content-end">
          <ButtonActionIcon className="d-flex align-items-center me-2" onClick={() => onDelete(item.id)}>
            <LuTrash2 size={16} className="text-danger" />
          </ButtonActionIcon>
          <ButtonActionIcon className="d-flex align-items-center" onClick={() => onEdit(item.id)}>
            <FaRegEdit size={16} className="text-secondary" />
          </ButtonActionIcon>
        </div>
      </div>
    </div>
  );
}
