import { useContext, useState } from "react";
import { DataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const { allData } = useContext(DataContext);
  const [inputId, setInputId] = useState(""); // State to track the input
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // React Router's navigation hook

  // const users = allData?.find((user) => user?.id === inputId);
  const ids = allData.slice(0, 10);
  const handleSubmit = () => {
    const numericInputId = Number(inputId); // Convert input to a number
    const matchingIdUser = allData.find((user) => user.id === numericInputId);
    if (matchingIdUser.role === "admin") {
      // If the ID matches, navigate to the admin page
      navigate(`/admin/${numericInputId}`);
    } else if (
      matchingIdUser.role === "owner" ||
      matchingIdUser.role === "client"
    ) {
      navigate(`/profile/${numericInputId}`);
    } else {
      setError("Wrong ID. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-6">
          Please enter your ID to access your profile
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
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {/* Error message */}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
      <div className="text-center">
        <h3>You can Test With Different Roles</h3>
        <p className="flex flex-col">
          {ids.map((id) => {
            return (
              <span key={id.id}>
                {id.id} Role {id.role}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
