import { useState, useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { AppartmentContext } from "../contexts/AppartmentContext";
import { BookingContext } from "../contexts/BookignsContext";
import { useParams } from "react-router-dom";
import { Button, Table, Badge, Modal, Carousel } from "flowbite-react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EditProp from "./EditProp";
import ConfirmDeleteProp from "./ConfirmDeleteProp";
import EditUsers from "./EditUsers";
import ChangeProfileImage from "./ChangeImageProfile";
export default function ProfileCard() {
  // Add states for the modal and selected property
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [viewType, setViewType] = useState("images"); // "images" or "video"
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [tab, setTab] = useState("bookings");
  const [selectedUser1, setSelectedUser1] = useState(null);

  const [imageEditModalOpen, setImageEditModalOpen] = useState(false);

  // Open image edit modal
  const openImageEditModal = (user) => {
    setSelectedUser1(user);
    setImageEditModalOpen(true);
  };

  const handleTabSwitch = (tableName) => {
    setTab(tableName);
  };

  const { id } = useParams();
  // console.log(typeof id);
  const oldUrl = "https://bio3.catalyst.com.eg/public/Catalyst_portfolio/";

  const baseUrl = "https://test.catalystegy.com/";

  const { allData } = useContext(DataContext);
  const { allData: apartments, setData } = useContext(AppartmentContext);
  const { allBookings: bookings, setBookings } = useContext(BookingContext);

  const updateBookingStatus = async (booking, action) => {
    try {
      const response = await fetch(
        `https://test.catalystegy.com/api/bookings/${booking.id}/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: action }), // Pass the status in the request body
        }
      );

      if (response.ok) {
        const updatedBooking = await response.json();
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.id === booking.id ? { ...b, status: updatedBooking.status } : b
          )
        );
        location.reload();
      } else {
        console.error("Failed to update booking status");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };
  // Find the selected user
  const selectedUser = allData.find((item) => item?.id === Number(id));
  const myProp = apartments.filter((prob) => prob?.user_id === Number(id));
  const myBookings = bookings.filter((book) => book?.user_id === Number(id));
  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedProperty(null);
  };

  const handleEditClick = (user) => {
    setSelectedUser1(user);
    setEditModalOpen(true);
  };

  const openViewModal = (property, type) => {
    setSelectedProperty(property);
    setViewType(type);
    setViewModalOpen(true);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedProperty(null);
    setEditModalOpen(false);
    setSelectedUser1(null);
  };

  // Function to open the edit modal
  const openEditModal = (property) => {
    setSelectedProperty(property);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property); // Set the property to delete
    setDeleteModalOpen(true); // Open the delete modal
  };

  const confirmDelete = async (id) => {
    try {
      const response = await fetch(
        `https://test.catalystegy.com/api/properties/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedData = myProp.filter((property) => property.id !== id);
        setData(updatedData);
        setDeleted(true); // Set deleted to true on successful deletion
      } else {
        console.error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <>
      {/* header Card */}
      <div className="header-card">
        <div className="flex justify-around  border-gray border-[2px] py-4 w-[80%] m-auto my-4 rounded-md shadow-lg max-lg:w-[95%] max-md:flex-col max-md:px-4">
          <div className="w-[200px] h-[200px] border-red-600 border-[3px] p-2 rounded-full relative max-md:m-auto max-md:mb-3 ">
            <img
              src={
                selectedUser?.profile_image?.trim().startsWith(oldUrl)
                  ? selectedUser?.profile_image
                  : baseUrl + selectedUser?.profile_image
              }
              className="rounded-full h-[180px] w-[200px]"
              alt=""
            />
            <div className="w-[40px] h-[40px] absolute z-10 bottom-4 right-1 bg-white flex items-center justify-center rounded-full border-gray-700 border-2">
              <button onClick={() => openImageEditModal(selectedUser)}>
                <FaPen />
              </button>
            </div>
          </div>
          <div className="border border-gray border-1 rounded-lg py-5 px-7 shadow-md h-fit">
            <p>
              Name: <span>{selectedUser?.name}</span>
            </p>
            <p>
              Phone Number: <span>{selectedUser?.phone}</span>
            </p>
            <p>
              Email: <span>{selectedUser?.email}</span>
            </p>
            <p>
              Role: <span>{selectedUser?.role}</span>
            </p>
            <div className="flex justify-end">
              <Button
                onClick={() => handleEditClick(selectedUser)}
                color="blue"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Buttons Section */}
      <span className="flex  justify-center items-center gap-3 border border-gray w-[20%] m-auto py-3 rounded-lg shadow-md max-md:w-[95%] max-2xl:w-[70%] ">
        <Button
          onClick={() => handleTabSwitch("bookings")}
          gradientDuoTone="greenToBlue"
        >
          My Bookings
        </Button>
        <Button
          onClick={() => handleTabSwitch("props")}
          gradientDuoTone="purpleToPink"
        >
          My Properties
        </Button>
      </span>
      {/* Booking Table Section */}
      {tab === "bookings" && (
        <div className="overflow-x-auto w-[80%] m-auto border border-gray rounded-sm shadow-lg my-4 max-lg:w-[95%]">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Booking ID</Table.HeadCell>
              <Table.HeadCell>Client Name</Table.HeadCell>
              <Table.HeadCell>Client Phone</Table.HeadCell>
              <Table.HeadCell>Client Email</Table.HeadCell>
              <Table.HeadCell>Property ID</Table.HeadCell>
              <Table.HeadCell>Property Name</Table.HeadCell>
              <Table.HeadCell>Property Location</Table.HeadCell>
              <Table.HeadCell>Property Price</Table.HeadCell>
              <Table.HeadCell>Booking Status</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {myBookings.map((book) => {
                return (
                  <Table.Row
                    key={book?.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {book.id}
                    </Table.Cell>
                    <Table.Cell>{book?.user?.name}</Table.Cell>
                    <Table.Cell>{book?.user?.phone}</Table.Cell>
                    <Table.Cell>{book?.user?.email}</Table.Cell>
                    <Table.Cell>{book?.property?.id}</Table.Cell>
                    <Table.Cell>{book?.property?.name}</Table.Cell>
                    <Table.Cell>{book?.property?.location} </Table.Cell>
                    <Table.Cell>${book?.property?.price}</Table.Cell>
                    <Table.Cell className="w-[5%]">
                      <Badge
                        className="w-full"
                        color={
                          book?.status === "canceled"
                            ? "failure"
                            : book?.status === "confirmed"
                            ? "success"
                            : "warning"
                        }
                      >
                        {book?.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell className="flex justify-center items-center gap-1 flex-col">
                      <Button
                        color="success"
                        onClick={() => updateBookingStatus(book, "confirmed")}
                      >
                        Confirm
                      </Button>
                      <Button
                        color="failure"
                        onClick={() => updateBookingStatus(book, "canceled")}
                      >
                        Cancel
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      )}

      {/* ///////////////////////////////////////////////////////// */}
      {/* Properties Table Section */}
      <div className="relative w-[80%] m-auto mb-10 max-lg:w-[95%]">
        {tab === "props" && (
          <div className="overflow-x-auto w-full m-auto border border-gray rounded-sm shadow-lg my-4 max-lg:w-[95%]">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>Property ID</Table.HeadCell>
                <Table.HeadCell>Property Name</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Location</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Images</Table.HeadCell>
                <Table.HeadCell>Videos</Table.HeadCell>
                <Table.HeadCell>Last Update</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {myProp.map((property) => {
                  return (
                    <Table.Row
                      key={property.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {property?.id}
                      </Table.Cell>
                      <Table.Cell>{property?.name}</Table.Cell>
                      <Table.Cell>${property?.price}</Table.Cell>
                      <Table.Cell>{property?.location}</Table.Cell>
                      <Table.Cell>{property?.description}</Table.Cell>
                      <Table.Cell>
                        <Button
                          onClick={() => openViewModal(property, "images")}
                          color="blue"
                        >
                          Images
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          onClick={() => openViewModal(property, "video")}
                          color="blue"
                        >
                          Videos
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        {property?.updated_at.split("T")[0]}
                      </Table.Cell>
                      <Table.Cell className="m-auto">
                        <Button
                          onClick={() => openEditModal(property)}
                          color="blue"
                          className="mb-1"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick(property)}
                          color="failure"
                        >
                          <MdDelete />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        )}
        {viewModalOpen && selectedProperty && (
          <Modal show={viewModalOpen} size="md" onClose={closeViewModal}>
            <Modal.Header>{selectedProperty.name}</Modal.Header>
            <Modal.Body>
              <div className="space-y-6 p-6">
                {viewType === "images" ? (
                  <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                    <Carousel slide={false}>
                      {(selectedProperty.images &&
                        (Array.isArray(selectedProperty.images)
                          ? selectedProperty.images
                          : JSON.parse(selectedProperty.images)
                        ).map((image, index) => (
                          <div
                            key={index}
                            className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
                          >
                            <LazyLoadImage
                              src={`${baseUrl}${image.replace(/^\\/, "/")}`}
                              alt={`Slide ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))) || <p>No images available</p>}
                    </Carousel>
                  </div>
                ) : (
                  <div>
                    {selectedProperty.video ? (
                      <video className="w-full h-auto" controls>
                        <source src={selectedProperty.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <p>No video available</p>
                    )}
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button color="gray" onClick={closeViewModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {editModalOpen && selectedProperty && (
          <EditProp
            open={editModalOpen}
            onClose={closeEditModal}
            property={selectedProperty}
          />
        )}

        {propertyToDelete && (
          <ConfirmDeleteProp
            isOpen={deleteModalOpen}
            onClose={() => {
              setDeleteModalOpen(false);
              setDeleted(false);
            }}
            onConfirm={confirmDelete}
            property={propertyToDelete}
            deleted={deleted}
          />
        )}
        {/* Edit Modal */}
        {editModalOpen && selectedUser && (
          <EditUsers
            open={editModalOpen}
            onClose={closeEditModal}
            item={selectedUser1}
          />
        )}
        {imageEditModalOpen && selectedUser1 && (
          <ChangeProfileImage
            open={imageEditModalOpen}
            onClose={() => setImageEditModalOpen(false)}
            item={selectedUser1}
          />
        )}
      </div>
    </>
  );
}
