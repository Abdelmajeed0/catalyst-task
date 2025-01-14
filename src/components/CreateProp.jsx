/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal } from "flowbite-react";

export default function CreateNewProperty({ isOpen, onClose }) {
  const [user_id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  // const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle videos file change
  // const handleVideosChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setVideos(files);
  // };

  // Handle images file change
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that the ID is a number
    if (isNaN(user_id) || user_id.trim() === "") {
      alert("Please enter a valid ID (numeric value).");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("user_id", Number(user_id)); // Add ID to form data
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    // videos.forEach((video, index) => {
    //   formData.append(`videos[${index}]`, video);
    // });
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    try {
      const response = await fetch(
        "https://test.catalystegy.com/api/properties",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setSuccessMessage("Property has been created successfully!");
        // Reset fields after successful submission
        setId("");
        setName("");
        setDescription("");
        setPrice("");
        setLocation("");
        // setVideos([]);
        setImages([]);
      } else {
        alert("Failed to create property.");
      }
    } catch (error) {
      console.error("Error creating property:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Create New Property</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ID field */}
          <div>
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              type="text"
              id="user_id"
              value={user_id}
              onChange={(e) => setId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Property Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Property Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={5}
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Property Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Property Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              onChange={handleVideosChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div> */}
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Property Images
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {successMessage && (
            <p className="text-green-500 text-md">{successMessage}</p>
          )}
          <div className="mt-4 flex gap-4">
            <Button type="submit" className="bg-black">
              {loading ? "Saving" : "Create New Property"}
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
