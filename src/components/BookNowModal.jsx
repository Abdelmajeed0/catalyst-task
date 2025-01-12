/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal } from "flowbite-react";

export default function BookNowModal({ isOpen, onClose, propId }) {
  const [formData, setFormData] = useState({
    user_id: "",
    start_date: "",
    end_date: "",
    property_id: Number(propId),
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (!formData.user_id || !formData.start_date || !formData.end_date) {
      alert("Please fill out all fields");
      return;
    }

    try {
      setLoading(true);
      // Prepare the payload
      const payload = {
        user_id: Number(formData.user_id),
        start_date: formData.start_date,
        end_date: formData.end_date,
        property_id: Number(propId),
      };

      // Make the POST request
      const response = await fetch(
        "https://test.catalystegy.com/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      // Handle the response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage(data.message);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Reserve Now</Modal.Header>
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
              placeholder="Please Enter Your ID number"
              id="user_id"
              name="user_id"
              value={formData.user_id}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
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
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
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
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <div className="mt-4 flex gap-4">
            {!successMessage && (
              <Button type="submit" className="bg-black">
                {loading ? "Confirming" : "Confirm booking"}
              </Button>
            )}

            <Button type="button" color="gray" onClick={onClose}>
              Close
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
