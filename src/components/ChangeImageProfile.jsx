/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Button } from "flowbite-react";

export default function EditUsers({ open, onClose, item }) {
  const [formData, setFormData] = useState({
    profile_image: null,
    // intro_video: null,
  });

  // Handle file input change (for profile image)
  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        profile_image: files[0], // Set the file selected by the user
      }));
    }
  };
  // const handleVideoChange = (e) => {
  //   const { files } = e.target;

  //   if (files && files[0]) {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       intro_video: files[0], // Set the file selected by the user
  //     }));
  //   }
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    // Append each field, including the file
    Object.keys(formData).forEach((key) => {
      if (key === "profile_image" && formData[key]) {
        updatedData.append(key, formData[key]);
      } else {
        updatedData.append(key, formData[key]);
      }
    });
    // Object.keys(formData).forEach((key) => {
    //   if (key === "intro_video" && formData[key]) {
    //     updatedData.append(key, formData[key]);
    //   } else {
    //     updatedData.append(key, formData[key]);
    //   }
    // });

    try {
      const response = await fetch(
        `https://test.catalystegy.com/api/users/${item.id}`,
        {
          method: "POST",
          body: updatedData,
        }
      );

      if (response.ok) {
        alert("User updated successfully!");
        onClose(); // Close the modal after success
        location.reload(); // refresh the page after the prop being updated
      } else {
        alert("Failed to update user.");
      }
      const updatedUser = await response.json();
      console.log(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred.");
    }
  };

  return (
    <Modal show={open} className="bg-white" size="md" onClose={onClose}>
      <Modal.Header>Edit User</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="profile_image"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image URL
            </label>
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              onChange={handleFileChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* <div>
            <label
              htmlFor="intro_video"
              className="block text-sm font-medium text-gray-700"
            >
              Intro Video URL
            </label>
            <input
              name="intro_video"
              type="file"
              id="intro_video"
              onChange={handleVideoChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div> */}
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
