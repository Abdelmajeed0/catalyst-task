import { useState } from "react";
import AdminTable from "../components/AdminTable";
import AdminPropTable from "../components/AdminPropTable";

export default function AdminPage() {
  const [table, setTable] = useState("users");

  // Function to handle button click and toggle tables
  const handleTableSwitch = (tableName) => {
    setTable(tableName);
  };

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
          className={`px-4 py-2 rounded-md text-white ${
            table === "properties" ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          Properties
        </button>
      </div>

      {/* Conditionally render the table based on the active button */}
      {table === "users" ? <AdminTable /> : <AdminPropTable />}
    </div>
  );
}
