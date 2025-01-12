/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Modal } from "flowbite-react";

export default function CreateNewUser({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("client");
  const [profileImage, setProfileImage] = useState(null);
  // const [introVideo, setIntroVideo] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle profile image file change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  // Handle intro video file change
  // const handleIntroVideoChange = (e) => {
  //   const file = e.target.files[0];
  //   setIntroVideo(file);
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("role", role);
    if (profileImage) formData.append("profile_image", profileImage);
    // if (introVideo) formData.append("intro_video", introVideo);

    try {
      const response = await fetch("https://test.catalystegy.com/api/users", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("User has been created successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setRole("client");
        setProfileImage(null);
        // setIntroVideo(null);
      } else {
        alert("Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Create New User</Modal.Header>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* <div>
            <label
              htmlFor="introVideo"
              className="block text-sm font-medium text-gray-700"
            >
              Intro Video
            </label>
            <input
              type="file"
              id="introVideo"
              accept="video/*"
              onChange={handleIntroVideoChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div> */}
          {successMessage && (
            <p className="text-green-500 text-md">{successMessage}</p>
          )}
          <div className="mt-4 flex gap-4">
            <Button type="submit" className="bg-black">
              {loading ? "Saving" : "Create New User"}
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
