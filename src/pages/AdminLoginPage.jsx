import { useContext, useState } from "react";
import { DataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const { allData } = useContext(DataContext);
  const [inputId, setInputId] = useState(""); // State to track the input
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // React Router's navigation hook

  const admins = allData?.filter((user) => user?.role === "admin");
  console.log(admins);

  const handleSubmit = () => {
    const numericInputId = Number(inputId); // Convert input to a number
    const matchingAdmin = admins.find((admin) => admin.id === numericInputId);

    if (matchingAdmin) {
      // If the ID matches, navigate to the admin page
      navigate(`/admin/${numericInputId}`);
    } else {
      // If the ID is wrong, set an error message
      setError("Wrong ID. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-6">
          Please enter your ID to access your admin page
        </h2>
        <input
          type="text"
          placeholder="Please Enter Your ID number"
          id="user_id"
          name="user_id"
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)} // Update state on input change
          required
        />
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}{" "}
        {/* Error message */}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
