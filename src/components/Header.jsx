import { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../assets/logo.png";

export default function Header() {
  const [role, setRole] = useState("admin"); // Default role

  // Role-specific paths
  const rolePaths = {
    owner: "/owner",
    admin: "/admin",
    client: "/client",
  };

  return (
    <header className="flex flex-wrap items-center justify-between bg-gray-800 text-white px-6 py-4">
      {/* Logo and Home Link */}
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <LazyLoadImage src={logo} alt="Logo" className="h-10" />
        <Link
          to="/"
          className="text-lg font-bold hover:text-gray-300 transition duration-300"
        >
          Home
        </Link>
      </div>

      {/* Role Selector and Dynamic Link */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* next to this select element should be an input field to enter the id of the cient or the owner should be navigated to and if that id is wrong we need to handle it */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
          <option value="client">Client</option>
        </select>
        <Link
          to={rolePaths[role]}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300"
        >
          {role.charAt(0).toUpperCase() + role.slice(1)} Page
        </Link>
      </div>
    </header>
  );
}
