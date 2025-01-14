/* eslint-disable react/prop-types */
import { Button, Modal } from "flowbite-react";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  property,
  deleted,
  resetDeleted,
}) {
  const handleClose = () => {
    if (resetDeleted) resetDeleted();
    onClose();
  };

  return (
    <Modal show={isOpen} size="md" onClose={handleClose}>
      <Modal.Body>
        <h2 className="text-xl font-semibold">
          Are you sure you want to delete the property {property?.name}?
        </h2>
        {deleted && (
          <p className="text-green-500 text-md">
            The property has been deleted successfully.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!deleted && (
          <Button color="red" onClick={() => onConfirm(property.id)}>
            Yes
          </Button>
        )}

        {deleted ? (
          <Button color="gray" onClick={handleClose}>
            Close
          </Button>
        ) : (
          <Button color="gray" onClick={handleClose}>
            Cancel
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
