import { createContext, useState, useEffect } from "react";

const AppartmentContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AppartmentProvider({ children }) {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("https://test.catalystegy.com/api/properties");

        if (!res.ok) {
          const errorMessage = `HTTP Error: ${res.status} ${res.statusText}`;
          console.error(errorMessage);
          setError(errorMessage);
          setLoading(false);
          return;
        }

        const fullData = await res.json();
        setAllData(fullData);
        setData(fullData.slice(0, itemsPerPage));
        setLoading(false);
      } catch (err) {
        console.error("Error Fetching Data:", err);
        setError(`Network Error: ${err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Load more data as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading &&
        data.length < allData.length
      ) {
        const nextPage = page + 1;
        const start = (nextPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        setData((prevData) => [...prevData, ...allData.slice(start, end)]);
        setPage(nextPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, data.length, allData]);

  return (
    <AppartmentContext.Provider value={{ data, loading, error, setData }}>
      {children}
    </AppartmentContext.Provider>
  );
}

export { AppartmentContext };
