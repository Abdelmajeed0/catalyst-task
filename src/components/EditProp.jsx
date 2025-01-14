/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Modal, Button } from "flowbite-react";

export default function EditProp({ open, onClose, property }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: property?.name || "",
    description: property?.description || "",
    price: property?.price || "",
    location: property?.location || "",
    // videos: [],
    images: null,
  });

  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name || "",
        description: property.description || "",
        price: property.price || "",
        location: property.location || "",
        // videos: [],
        // images: null,
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  console.log(property);

  const handleFileChange = (e, key) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      [key]: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("description", formData.description);
    updatedData.append("price", formData.price);
    updatedData.append("location", formData.location);

    // Append old images (if they exist)
    if (property.images && property.images.length > 0) {
      property.images.forEach((image) => {
        updatedData.append("existing_images[]", image);
      });
    }

    // Append new images
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((image, index) => {
        updatedData.append(`images[${index}]`, image);
      });
    }
    try {
      setLoading(true);
      const response = await fetch(
        `https://test.catalystegy.com/api/properties/${property.id}`,
        {
          method: "POST",
          body: updatedData,
        }
      );

      if (response.ok) {
        alert("Property updated successfully!");
        onClose();
        location.reload(); // refresh the page after the prop being updated
      } else {
        alert("Failed to update property.");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={open} className="bg-white" size="md" onClose={onClose}>
      <Modal.Header>Edit Property</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
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
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          {/* <div>
            <label
              htmlFor="videos"
              className="block text-sm font-medium text-gray-700"
            >
              Videos
            </label>
            <input
              type="file"
              id="videos"
              accept="video/*"
              multiple
              onChange={(e) => handleFileChange(e, "videos")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
         */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Images
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "images")}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={handleSubmit}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
