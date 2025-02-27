import PropTypes from "prop-types";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // Start with modal closed

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    // Optionally reset form fields when closing
    setTitle("");
    setAuthor("");
    setUrl("");
    setLikes(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewBlog({ title, author, url, likes });
    close();
  };

  return (
    <>
      <Button
        onClick={open}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Add new blog
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close} // This ensures backdrop click triggers close
      >
        <DialogBackdrop className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="font-light text-lg mb-4 text-center"
              >
                Add new blog
              </DialogTitle>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-light text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 focus:outline-gray-300 border font-light border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type blog title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="author"
                      className="block mb-2 text-sm font-light text-gray-900 dark:text-white"
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      className="bg-gray-50 border focus:outline-gray-300 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type author name"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="url"
                      className="block mb-2 text-sm font-light text-gray-900 dark:text-white"
                    >
                      Url
                    </label>
                    <input
                      type="text"
                      name="url"
                      id="url"
                      className="bg-gray-50 border focus:outline-gray-300 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type blog url"
                      required
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="likes"
                      className="block mb-2 text-sm font-light text-gray-900 dark:text-white"
                    >
                      Likes
                    </label>
                    <input
                      type="number"
                      name="likes"
                      id="likes"
                      className="bg-gray-50 border focus:outline-gray-300 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                      value={likes}
                      onChange={(e) => setLikes(Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Add blog
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
};

export default BlogForm;
