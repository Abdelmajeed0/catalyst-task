import { useState, useContext } from "react";
import { BookingContext } from "../contexts/BookignsContext";
import { Table, Badge, Button, Modal } from "flowbite-react";
import CreateNewBooking from "./CreateBooking";
import { FaPlusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmDeleteBooking from "./ConfirmDeleteBooking";

export default function AdminBookingsTable() {
  const { bookings, setBookings, loading, error } = useContext(BookingContext);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [action, setAction] = useState(null);
  const [message, setMessage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [createNewModalOpen, setCreateNewModalOpen] = useState(false);

  // Handle confirm/cancel action click
  const handleActionClick = (booking, actionType) => {
    setSelectedBooking(booking);
    setAction(actionType);
    setViewModalOpen(true);
  };

  // Open the delete confirmation modal
  const handleDeleteClick = (booking) => {
    setBookingToDelete(booking);
    setDeleteModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedBooking(null);
    setAction(null);
    setMessage(null);
  };

  const confirmAction = async () => {
    const endpoint = `https://test.catalystegy.com/api/bookings/${selectedBooking.id}/status`;
    const method = "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: action === "confirm" ? "confirmed" : "canceled",
        }),
      });

      if (response.ok) {
        const updatedBookings = bookings.map((booking) =>
          booking.id === selectedBooking.id
            ? {
                ...booking,
                status: action === "confirm" ? "confirmed" : "canceled",
              }
            : booking
        );
        setBookings(updatedBookings);
        setMessage(`Booking ${action} successfully!`);
      } else {
        setMessage(`Failed to ${action} booking.`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }

    closeViewModal();
  };

  // Delete booking function
  const deleteBooking = async (id) => {
    try {
      const response = await fetch(
        `https://test.catalystegy.com/api/bookings/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedBookings = bookings.filter((booking) => booking.id !== id);
        setBookings(updatedBookings);
        setMessage("Booking deleted successfully!");
        setDeleteModalOpen(false); // Close the delete modal after deletion
      } else {
        setMessage("Failed to delete booking.");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  if (error) {
    return (
      <p className="text-center mt-[60px] text-5xl">No data to be shown</p>
    );
  }

  if (loading) {
    return <p className="text-center mt-[60px] text-5xl">Loading...</p>;
  }

  return (
    <>
      <div className="overflow-x-auto relative">
        <div className="text-center flex items-center justify-center">
          <Button
            color="blue"
            onClick={() => setCreateNewModalOpen(true)}
            className="fixed left-[50%] translate-x-[-50%] bottom-10 rounded-full text-5xl z-10"
          >
            <FaPlusCircle className="text-4xl" />
          </Button>
        </div>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Booking ID</Table.HeadCell>
            <Table.HeadCell>Owner</Table.HeadCell>
            <Table.HeadCell>Property</Table.HeadCell>
            <Table.HeadCell>Client name</Table.HeadCell>
            <Table.HeadCell>Start Date</Table.HeadCell>
            <Table.HeadCell>End Date</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Last Update</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {bookings.map((booking) => (
              <Table.Row
                key={booking.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex justify-start items-center">
                  {booking.id}
                </Table.Cell>
                <Table.Cell>{booking.user?.name || "N/A"}</Table.Cell>
                <Table.Cell>{booking.property?.name || "N/A"}</Table.Cell>
                <Table.Cell>{booking?.user?.name || "N/A"}</Table.Cell>
                <Table.Cell>{booking.start_date}</Table.Cell>
                <Table.Cell>{booking.end_date}</Table.Cell>
                <Table.Cell>${booking.property?.price || "N/A"}</Table.Cell>
                <Table.Cell className="w-[5%]">
                  <Badge
                    className="w-full"
                    color={
                      booking.status === "canceled"
                        ? "failure"
                        : booking.status === "pending"
                        ? "warning"
                        : "success"
                    }
                  >
                    {booking.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{booking.updated_at.split("T")[0]}</Table.Cell>
                <Table.Cell className="flex justify-center items-center gap-2">
                  <Button
                    className="flex justify-center items-center"
                    color="success"
                    onClick={() => handleActionClick(booking, "confirm")} // Open confirm modal
                  >
                    Confirm
                  </Button>
                  <Button
                    color="failure"
                    onClick={() => handleActionClick(booking, "cancel")}
                  >
                    Cancel
                  </Button>

                  <Button
                    color="failure"
                    onClick={() => handleDeleteClick(booking)}
                  >
                    <MdDelete />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <CreateNewBooking
        isOpen={createNewModalOpen}
        onClose={() => setCreateNewModalOpen(false)}
      />

      {/* View Modal for Confirmation */}
      {viewModalOpen && selectedBooking && (
        <Modal show={viewModalOpen} size="md" onClose={closeViewModal}>
          <Modal.Header>{`Are you sure you want to ${action} this booking?`}</Modal.Header>
          <Modal.Body>
            <div className="space-y-6 p-6">
              <p>Booking ID: {selectedBooking.id}</p>
              <p>Client Name: {selectedBooking.user?.name}</p>
              <p>Status: {selectedBooking.status}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="success" onClick={confirmAction}>
              Yes, {action}
            </Button>
            <Button color="failure" onClick={closeViewModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Success or Failure message */}
      {message && (
        <div className="text-center mt-4">
          <p
            className={`text-xl ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        </div>
      )}

      {/* Confirmation Delete Modal */}
      {bookingToDelete && (
        <ConfirmDeleteBooking
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => deleteBooking(bookingToDelete.id)} // Pass the booking id to delete
          booking={bookingToDelete}
        />
      )}
    </>
  );
}
