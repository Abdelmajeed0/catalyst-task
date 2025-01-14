import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../assets/logo.png";

export default function Header() {
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
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
