/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal } from "flowbite-react";

export default function CreateNewBooking({ isOpen, onClose }) {
  const [user_id, setUserId] = useState("");
  const [property_id, setPropertyId] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset errors

    const formData = new FormData();
    formData.append("user_id", Number(user_id));
    formData.append("property_id", Number(property_id));
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);

    try {
      const response = await fetch(
        "https://test.catalystegy.com/api/bookings",

        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setSuccessMessage("Booking has been created successfully!");
        // Reset fields after successful submission
        setUserId("");
        setPropertyId("");
        setStartDate("");
        setEndDate("");
      } else {
        const errorData = await response.json();
        if (errorData.messages) {
          setErrors(errorData.messages);
        } else {
          alert("Failed to create booking.");
        }
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Create New Booking</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="user_id"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              type="text"
              id="user_id"
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.user_id ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              required
            />
            {errors.user_id && (
              <p className="text-red-500 text-sm">{errors.user_id[0]}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="property_id"
              className="block text-sm font-medium text-gray-700"
            >
              Property ID
            </label>
            <input
              type="text"
              id="property_id"
              value={property_id}
              onChange={(e) => setPropertyId(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.property_id ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              required
            />
            {errors.property_id && (
              <p className="text-red-500 text-sm">{errors.property_id[0]}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="start_date"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="start_date"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.start_date ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              required
            />
            {errors.start_date && (
              <p className="text-red-500 text-sm">{errors.start_date[0]}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="end_date"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.end_date ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              required
            />
            {errors.end_date && (
              <p className="text-red-500 text-sm">{errors.end_date[0]}</p>
            )}
          </div>

          {successMessage && (
            <p className="text-green-500 text-md">{successMessage}</p>
          )}

          <div className="mt-4 flex gap-4">
            <Button type="submit" className="bg-black">
              {loading ? "Saving..." : "Create Booking"}
            </Button>
            <Button type="button" color="gray" onClick={onClose}>
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
