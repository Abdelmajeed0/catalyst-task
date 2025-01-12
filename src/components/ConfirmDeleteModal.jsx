/* eslint-disable react/prop-types */
import { Button, Modal } from "flowbite-react";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  user,
  deleted,
}) {
  return (
    <Modal show={isOpen} size="md" onClose={onClose}>
      <Modal.Body>
        <h2 className="text-xl font-semibold">
          Are you sure you want to delete {user?.name}?
        </h2>
        {deleted && (
          <p className="text-green-500 text-md">
            user has been deleted successfully
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!deleted && (
          <Button color="red" onClick={() => onConfirm(user.id)}>
            Yes
          </Button>
        )}

        {deleted ? (
          <Button color="gray" onClick={onClose}>
            Close
          </Button>
        ) : (
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
