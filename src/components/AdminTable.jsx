import { useState, useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { Table, Badge, Button, Modal } from "flowbite-react";
import EditUsers from "./EditUsers";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import CreateNewUser from "./CreateNewUser";
import { FaPlusCircle } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function AdminTable() {
  const { data, setData, loading, error } = useContext(DataContext);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [createNewModalOpen, setCreateNewModalOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const baseUrl = "https://test.catalystegy.com/";
  const oldUrl = "https://bio3.catalyst.com.eg/public/Catalyst_portfolio/";

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedUser(null);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  // Handle delete action
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  // Confirm delete action
  const confirmDelete = async (id) => {
    try {
      const response = await fetch(
        `https://test.catalystegy.com/api/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the deleted user from the data
        const updatedData = data.filter((user) => user.id !== id);
        setData(updatedData);
        setDeleted(true);
        // setDeleteModalOpen(false);
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
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
            className=" fixed left-[50%] translate-x-[-50%] bottom-10  rounded-full text-5xl z-10"
          >
            <FaPlusCircle className="text-4xl" />
          </Button>
        </div>
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Video</Table.HeadCell>
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
                  <span className="w-[25px] h-[25px]">
                    <LazyLoadImage
                      src={
                        item?.profile_image?.trim().startsWith(oldUrl)
                          ? item.profile_image
                          : baseUrl + item.profile_image
                      }
                      alt=""
                      className="w-full"
                    />
                  </span>{" "}
                  {item.name}
                </Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>{item.phone}</Table.Cell>
                <Table.Cell className="w-[5%]">
                  <Badge
                    className="w-full"
                    color={
                      item.role === "admin"
                        ? "failure"
                        : item.role === "owner"
                        ? "indigo"
                        : "warning"
                    }
                  >
                    {item.role}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button color="blue" onClick={() => handleViewClick(item)}>
                    View
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

      <CreateNewUser
        isOpen={createNewModalOpen}
        onClose={() => setCreateNewModalOpen(false)}
      />

      {/* View Modal */}
      {viewModalOpen && selectedUser && (
        <Modal show={viewModalOpen} size="md" onClose={closeViewModal}>
          <Modal.Header>{selectedUser.name}</Modal.Header>
          <Modal.Body>
            <div className="space-y-6 p-6">
              {selectedUser.intro_video ? (
                <video className="w-full h-auto" controls title="Intro Video">
                  <source src={selectedUser.intro_video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p>No video available</p>
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

      {/* Edit Modal */}
      {editModalOpen && selectedUser && (
        <EditUsers
          open={editModalOpen}
          onClose={closeEditModal}
          item={selectedUser}
        />
      )}

      {/* Confirmation Delete Modal */}
      {userToDelete && (
        <ConfirmDeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          user={userToDelete}
          deleted={deleted}
        />
      )}
    </>
  );
}
