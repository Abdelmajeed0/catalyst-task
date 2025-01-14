/* eslint-disable react/prop-types */
import { Button, Modal } from "flowbite-react";

export default function ConfirmDeleteBooking({
  isOpen,
  onClose,
  onConfirm,
  booking,
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
          Are you sure you want to delete the booking {booking?.id}?
        </h2>
        {deleted && (
          <p className="text-green-500 text-md">
            The booking has been deleted successfully.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!deleted && (
          <Button color="red" onClick={() => onConfirm(booking?.id)}>
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
