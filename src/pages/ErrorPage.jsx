import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <h1 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[72px] mb-4">
        Sorry we could not find this page
      </h1>
      <Link
        to="/"
        className="bg-blue-400 text-white hover:bg-blue-500 hover:text-white px-6 py-3 rounded transition text-sm sm:text-base md:text-lg"
      >
        Back to home
      </Link>
    </div>
  );
}
