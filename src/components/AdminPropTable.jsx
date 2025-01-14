import { useState, useContext } from "react";
import { AppartmentContext } from "../contexts/AppartmentContext";
import { Table, Button, Modal, Carousel } from "flowbite-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EditProp from "./EditProp";
import CreateNewProperty from "./CreateProp";
import ConfirmDeleteProp from "./ConfirmDeleteProp";
import { FaPlusCircle } from "react-icons/fa";

export default function AdminPropTable() {
  const { data, setData, loading, error } = useContext(AppartmentContext);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [createNewModalOpen, setCreateNewModalOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [viewType, setViewType] = useState("");

  const baseUrl = "https://test.catalystegy.com/";

  const handleViewClick = (property, type) => {
    setSelectedProperty(property);
    setViewModalOpen(true);
    setViewType(type);
  };

  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setEditModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedProperty(null);
    setViewType("");
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedProperty(null);
  };

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setDeleted(false); // Reset deleted state when a new property is selected
    setDeleteModalOpen(true);
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
        const updatedData = data.filter((property) => property.id !== id);
        setData(updatedData);
        setDeleted(true); // Set deleted to true on successful deletion
      } else {
        console.error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
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
            className=" fixed left-[50%] translate-x-[-50%] bottom-10 rounded-full text-5xl z-10"
          >
            <FaPlusCircle className="text-4xl" />
          </Button>
        </div>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Property Name</Table.HeadCell>
            <Table.HeadCell>Owner ID</Table.HeadCell>
            <Table.HeadCell>Owner Name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Location</Table.HeadCell>
            <Table.HeadCell>Video</Table.HeadCell>
            <Table.HeadCell>Property Images</Table.HeadCell>
            <Table.HeadCell>Last Update</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item) => (
              <Table.Row
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  {item.name}
                </Table.Cell>
                <Table.Cell>{item.user_id}</Table.Cell>
                <Table.Cell>{item.user.name}</Table.Cell>
                <Table.Cell>${item.price}</Table.Cell>
                <Table.Cell>{item.location}</Table.Cell>
                <Table.Cell>
                  <Button
                    color="blue"
                    onClick={() => handleViewClick(item, "videos")}
                  >
                    Vidoes
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="blue"
                    onClick={() => handleViewClick(item, "images")}
                  >
                    Images
                  </Button>
                </Table.Cell>
                <Table.Cell>{item.updated_at.split("T")[0]}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button color="gray" onClick={() => handleEditClick(item)}>
                      Edit
                    </Button>
                    <Button
                      color="white"
                      className="bg-red-500 text-white"
                      onClick={() => handleDeleteClick(item)}
                    >
                      Delete
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <CreateNewProperty
        isOpen={createNewModalOpen}
        onClose={() => setCreateNewModalOpen(false)}
      />
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
            setDeleted(false); // Reset deleted state on modal close
          }}
          onConfirm={confirmDelete}
          property={propertyToDelete}
          deleted={deleted}
        />
      )}
    </>
  );
}
