import Dialog from "../../../components/General/Dialog";
import Button from "../../../components/Button/Button";

interface Props {
  onDelete: () => void;
}

export default function DialogConfirmDelete(props: Props) {
  const { onDelete } = props;
  return (
    <Dialog id="modalConfirmDelete" title="Confirm Delete">
      <div>
        <p className="text-black fs-14">Are you sure to delete this?</p>
        <div className="d-flex align-items-center justify-content-end mt-4">
          <Button
            id="btn-close-confirm-delete"
            type="button"
            size="sm"
            data-bs-dismiss="modal"
            className="me-2"
          >
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete()}>
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
