import PropTypes from "prop-types";
import { useState } from "react";

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewBlog({ title, author, url, likes });
    setTitle("");
    setAuthor("");
    setUrl("");
    setLikes(0);
  };
  return (
    <div className="w-full lg:w-3/5 mx-auto border border-gray-200 rounded-lg p-4">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Add a new blog
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type blog title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="author"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type author name"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="url"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Url
            </label>
            <input
              type="text"
              name="url"
              id="url"
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type blog url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="likes"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Likes
            </label>
            <input
              type="number"
              name="likes"
              id="likes"
              className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="likes"
              required
              value={likes}
              onChange={(e) => setLikes(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add blog
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
};

export default BlogForm;
