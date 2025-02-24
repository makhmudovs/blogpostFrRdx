import PropTypes from "prop-types";
import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [expanded, setExpand] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  return (
    <div className="border-1 rounded-lg border-gray-200 border-opacity-50 p-4 mb-4">
      <div className="flex justify-between items-center">
        <h2 className="font-light text-lg title-font mb-3">
          Title:
          <span className="text-gray-900 font-medium">
            {" "}
            {blog.title} by {blog.author}{" "}
          </span>
        </h2>
        <button
          type="button"
          onClick={() => setExpand(!expanded)}
          className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Details
        </button>
      </div>
      <div className={expanded ? "" : "hidden"}>
        <h3 className="font-light title-font mb-3">
          Author:
          <span className="text-gray-900 font-medium"> {blog.author}</span>
        </h3>
        <h3 className="font-light title-font mb-3">
          Likes:
          <span className="text-gray-900 font-medium"> {blog.likes}</span>
          <button
            disabled={disabledBtn}
            type="button"
            onClick={() => {
              handleLike(blog);
              setDisabledBtn(true);
              setTimeout(() => {
                setDisabledBtn(false);
              }, 3000);
            }}
            className="ms-4 cursor-pointer text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
            </svg>
            <span className="sr-only">Like icon</span>
          </button>
        </h3>

        <a className="mt-3 text-indigo-500 inline-flex items-center">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <button
          type="button"
          onClick={() => handleDelete(blog.id)}
          className="mt-4 block focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
