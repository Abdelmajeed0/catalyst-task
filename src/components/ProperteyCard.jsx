import { useContext } from "react";
import { AppartmentContext } from "../contexts/AppartmentContext";
import { Link } from "react-router-dom";
import { Card, Carousel } from "flowbite-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function PropertyCard() {
  const { data } = useContext(AppartmentContext);

  const baseUrl = "https://test.catalystegy.com/";

  return (
    <div className="grid grid-cols-4 gap-6 place-items-center lg:px-6 lg:py-6  max-md:grid-cols-1">
      {data.map((prop) => {
        const images = prop?.images ? JSON.parse(prop.images) : [];

        return (
          <div className="mb-8" key={prop.id}>
            <Link className="block" to={`/${prop.id}`}>
              <Card
                className="max-w-sm  h-[450px]"
                renderImage={() => (
                  <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                    <Carousel slide={false}>
                      {images?.map((image, index) => (
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
                )}
              >
                <div className="flex justify-between items-center">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {prop?.location}
                  </h5>
                </div>
                <span className="font-bold">${prop?.price}</span>
                <span className="text-gray-600">{prop?.name}</span>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {prop?.descreption}
                </p>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
