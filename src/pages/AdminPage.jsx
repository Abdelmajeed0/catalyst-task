import { useState, useEffect } from "react";
import AdminTable from "../components/AdminTable";
import AdminPropTable from "../components/AdminPropTable";
import AdminBookingsTable from "../components/AdminBookingsTable"; // Import AdminBookingsTable

export default function AdminPage() {
  // Get the stored table state from localStorage or default to 'users'
  const storedTable = localStorage.getItem("activeTable") || "users";

  const [table, setTable] = useState(storedTable);

  const handleTableSwitch = (tableName) => {
    setTable(tableName);
    localStorage.setItem("activeTable", tableName);
  };

  useEffect(() => {
    const storedTable = localStorage.getItem("activeTable");
    if (storedTable) {
      setTable(storedTable);
    }
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        {/* Buttons to toggle between tables */}
        <button
          onClick={() => handleTableSwitch("users")}
          className={`px-4 py-2 mr-2 rounded-md text-white ${
            table === "users" ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => handleTableSwitch("properties")}
          className={`px-4 py-2 mr-2 rounded-md text-white ${
            table === "properties" ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          Properties
        </button>
        <button
          onClick={() => handleTableSwitch("bookings")}
          className={`px-4 py-2 rounded-md text-white ${
            table === "bookings" ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          Bookings
        </button>
      </div>

      {table === "users" ? (
        <AdminTable />
      ) : table === "properties" ? (
        <AdminPropTable />
      ) : (
        <AdminBookingsTable />
      )}
    </div>
  );
}
