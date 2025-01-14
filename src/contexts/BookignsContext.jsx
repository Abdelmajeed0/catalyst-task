import { createContext, useState, useEffect } from "react";

const BookingContext = createContext();

// eslint-disable-next-line react/prop-types
export default function BookingProvider({ children }) {
  const [allBookings, setAllBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("https://test.catalystegy.com/api/bookings");

        if (!res.ok) {
          const errorMessage = `HTTP Error: ${res.status} ${res.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
          setLoading(false);
          return;
        }

        const fullBookings = await res.json();
        setAllBookings(fullBookings);
        setBookings(fullBookings.slice(0, itemsPerPage));
        setLoading(false);
      } catch (err) {
        console.error("Error Fetching Bookings:", err);
        setError(`Network Error: ${err.message}`);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Load more data as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading &&
        bookings.length < allBookings.length
      ) {
        const nextPage = page + 1;
        const start = (nextPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        setBookings((prevBookings) => [
          ...prevBookings,
          ...allBookings.slice(start, end),
        ]);
        setPage(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, bookings.length, allBookings]);

  return (
    <BookingContext.Provider
      value={{ bookings, loading, error, setBookings, allBookings }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export { BookingContext };
