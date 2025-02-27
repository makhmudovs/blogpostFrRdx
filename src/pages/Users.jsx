import { useEffect, useState } from "react";
import { getUsers } from "../request";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const [userArray, setUsersArray] = useState([]);

  const getData = async () => {
    try {
      const users = await getUsers();
      console.log(users);
      setUsersArray(users);
    } catch (error) {
      console.log("erro while gettting users", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please refresh the page",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-4 max-w-screen-xl mx-auto my-5 bg-white rounded-lg shadow-xs relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-xs">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Users
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Browse a list of Users
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Blogs
            </th>
            <th scope="col" className="px-6 py-3 text-end">
              {"#"}
            </th>
          </tr>
        </thead>
        <tbody>
          {userArray.length > 0 ? (
            userArray.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.id || "------"}
                </th>
                <td className="px-6 py-4">{user.username || "------"}</td>
                <td className="px-6 py-4">{user.name || "------"}</td>
                <td className="px-6 py-4">{user.blogs.length}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/users/${user.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    More
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
