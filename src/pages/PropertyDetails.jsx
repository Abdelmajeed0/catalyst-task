import { useContext, useState } from "react";
import { AppartmentContext } from "../contexts/AppartmentContext";
import { Button, Carousel, Modal } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
import BookNowModal from "../components/BookNowModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function PropertyDetails() {
  const { data } = useContext(AppartmentContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const exsitingId = data.find((prop) => prop.id === Number(id));

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [bookNowModalOpen, setBookNowModalOpen] = useState(false);

  const selectedProp = data.find((item) => item.id === Number(id));

  const baseUrl = "https://test.catalystegy.com/";
  let images = [];
  if (selectedProp?.images) {
    try {
      images = JSON.parse(selectedProp.images);
    } catch (error) {
      console.error(
        "Failed to parse selectedProp images JSON:",
        error,
        selectedProp?.images
      );
      images = []; // Fallback to an empty array
    }
  }

  const handleViewClick = () => {
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  const handleReserveNowClick = () => {
    setBookNowModalOpen(true);
  };

  const closeBookNowModal = () => {
    setBookNowModalOpen(false);
  };

  const handleGetDirection = function () {
    if (selectedProp?.location) {
      const formattedLocation = selectedProp?.location
        .replace(/\n/g, ", ")
        .replace(/\s+/g, "+");
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedLocation}`;
      window.location.href = mapsUrl;
    } else {
      alert("Location not available");
    }
  };

  if (!exsitingId) {
    navigate("/");
    return;
  }

  return (
    <>
      <div className="w-[70%] m-auto pb-8 max-md:w-[90%]">
        <div className="flex justify-between mt-3 border border-gray-200 py-3 px-6 items-center rounded-2xl shadow-md">
          <div>
            <h2 className="text-xl uppercase font-semibold">
              {selectedProp?.name}
            </h2>
            <span className="text-gray-500">{selectedProp?.location}</span>
          </div>
          <div className="flex items-center justify-center gap-2 max-md:flex-col">
            <Button color="blue" onClick={handleViewClick}>
              Show Video
            </Button>
            <Button onClick={handleGetDirection} className="bg-green-400">
              Get Direction
            </Button>
          </div>
        </div>
        <div className="mt-3">
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
                >
                  <LazyLoadImage
                    src={`${baseUrl}${image.replace("\\", "/")}`}
                    alt={`Slide ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3 max-md:flex-col max-md:gap-3">
          <div className="border rounded-2xl border-gray-200 shadow-md py-2 px-12">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-[25px] h-[25px] rounded-full">
                <LazyLoadImage
                  src={selectedProp?.user?.profile_image}
                  className="w-full"
                  alt=""
                />
              </div>
              <h3>{selectedProp?.user?.name}</h3>
            </div>
            <p className="text-gray-400 font-semibold">
              {selectedProp?.user?.phone}
            </p>
          </div>
          <div className="translate-x-[-50%] max-md:translate-x-[0%] max-md:m-auto">
            <span>
              Price:{" "}
              <span className="font-semibold">${selectedProp?.price}</span>
            </span>
          </div>
          <div>
            <Button color="blue" onClick={handleReserveNowClick}>
              Reserve Now
            </Button>
          </div>
        </div>
        <div className="border border-gray-200 py-3 mt-3 px-6 rounded-2xl shadow-md">
          <h2>Description: </h2>
          <p>{selectedProp?.description}</p>
        </div>
      </div>

      {viewModalOpen && selectedProp && (
        <Modal show={viewModalOpen} size="md" onClose={closeViewModal}>
          <Modal.Header>{selectedProp.name}</Modal.Header>
          <Modal.Body>
            <div className="space-y-6 p-6">
              {selectedProp.video ? (
                <video className="w-full h-auto" controls title="Intro Video">
                  <source src={selectedProp.video} type="video/mp4" />
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

      {bookNowModalOpen && (
        <BookNowModal
          propId={id}
          isOpen={bookNowModalOpen}
          onClose={closeBookNowModal}
        />
      )}
    </>
  );
}
