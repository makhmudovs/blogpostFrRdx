import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../request";

const User = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  const fetchUser = async (id) => {
    try {
      const user = await getUser(id);
      console.log(user);
      if (user) {
        setUserData(user);
      }
    } catch (error) {
      console.error("error occurred while getting user", error);
    }
  };

  useEffect(() => {
    fetchUser(id);
  }, [id]); // Add `id` as a dependency to refetch if it changes

  // Render loading state until userData is available
  if (!userData) {
    return (
      <div className="relative p-4 w-full mx-auto max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <p className="text-gray-500 dark:text-gray-400">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-4 w-full mx-auto max-w-2xl h-full md:h-auto">
      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          User Info
        </h3>
        <form action="#">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-light text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 font-light focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                disabled={true}
                value={userData.name || "-----"} // Controlled input with fallback
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-light text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 font-light focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                disabled={true}
                value={userData.username || "-----"} // Controlled input with fallback
              />
            </div>
          </div>
        </form>

        <h2 className="mt-4 mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Blogs:
        </h2>
        <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          {userData.blogs && userData.blogs.length > 0 ? (
            userData.blogs.map((blog) => (
              <li key={blog.id}>{blog.title || "Untitled"}</li>
            ))
          ) : (
            <li>-----</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default User;