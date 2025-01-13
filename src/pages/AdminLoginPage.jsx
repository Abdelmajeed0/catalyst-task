import { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

export default function AdminLoginPage() {
  const { allData } = useContext(DataContext);
  // console.log(allData);

  const admins = allData?.filter((user) => user?.role === "admin");
  console.log(admins);

  return (
    <>
      <h2>Please enter your id to show your page</h2>
      <input
        type="text"
        placeholder="Please Enter Your ID number"
        id="user_id"
        name="user_id"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </>
  );
}
