/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal, Button } from "flowbite-react";

export default function EditBooking({ open, onClose, booking }) {
  const [formData, setFormData] = useState({
    propertyName: booking?.property?.name || "", // Safe access for booking and property
    clientName: booking?.user?.name || "",
    startDate: booking?.start_date || "",
    endDate: booking?.end_date || "",
    price: booking?.property?.price || "",
    status: booking?.status || "pending", // Default status
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        propertyName: booking.property?.name || "",
        clientName: booking.user?.name || "",
        startDate: booking.start_date || "",
        endDate: booking.end_date || "",
        price: booking.property?.price || "",
        status: booking.status || "pending",
      });
    }
  }, [booking]);

  // Handle input field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      start_date: formData.startDate,
      end_date: formData.endDate,
    };

    try {
      const response = await fetch(
        `https://test.catalystegy.com/api/bookings/${booking.id}`,
        {
          method: "PUT", // Using PUT for updating
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        alert("Booking updated successfully!");
        onClose(); // Close the modal after success
        location.reload(); // Refresh the page after the update
      } else {
        alert("Failed to update booking.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("An error occurred.");
    }
  };

  return (
    <Modal show={open} className="bg-white" size="md" onClose={onClose}>
      <Modal.Header>Edit Booking</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="propertyName"
              className="block text-sm font-medium text-gray-700"
            >
              Property Name
            </label>
            <input
              type="text"
              id="propertyName"
              value={formData.propertyName || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="clientName"
              className="block text-sm font-medium text-gray-700"
            >
              Client Name
            </label>
            <input
              type="text"
              id="clientName"
              value={formData.clientName || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={formData.price || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              value={formData.status || "pending"}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" onClick={handleSubmit}>
          Save Changes
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
