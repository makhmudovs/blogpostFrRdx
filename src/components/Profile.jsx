import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../features/userSlice";

import ProfileImg from "../assets/profile-picture-3.jpg";
const Profile = () => {
  const [expanded, setExpanded] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => setExpanded(!expanded)}
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src={ProfileImg}
          alt="user photo"
        />
      </button>
      <div
        className={`${
          expanded ? "" : "hidden"
        } absolute top-10 right-10 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            {user.username || "jhondoe"}
          </span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            {user.email || "name@flowbite.com"}
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <Link
              onClick={() => {
                dispatch(clearUser());
              }}
              to="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Profile;
