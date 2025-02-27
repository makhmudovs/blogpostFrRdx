import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../features/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { setBlog } from "../features/blogSlice";
import { getBlog, updateBlog, deleteBlog } from "../request";
import { createComment } from "../request";
import { getTokenConfig } from "../utils";

import Swal from "sweetalert2";

import BlogComments from "../components/BlogComments";

const Blog = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { blog } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchBlog = async (id) => {
    try {
      const blogs = await getBlog(id);
      dispatch(setBlog(blogs));
    } catch (error) {
      console.error("error while fetching blogs ", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const res = await createComment(id, comment);
      if (res) {
        fetchBlog(id);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Comment added",
          showConfirmButton: false,
          timer: 1500,
        });
        setComment("");
      }
    } catch (error) {
      console.error("error while commenting", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.request.response,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleLike = async (blog) => {
    const config = getTokenConfig();
    if (config === null) {
      dispatch(clearUser());
      navigate("/login", { replace: true });
    }
    try {
      const res = await updateBlog(
        blog.id,
        { ...blog, likes: blog.likes + 1 },
        config
      );
      if (res) {
        dispatch(setBlog(res));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Liked successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("error while commenting", error);
      if (error.status === 403) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Cannot like this blog",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Internal error occured",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleDelete = async (id) => {
    const config = getTokenConfig();
    if (config === null) {
      navigate("/login", { replace: true });
    }
    try {
      const deletedBlog = await deleteBlog(id, config);
      if (deletedBlog === null) {
        navigate("/login", { replace: true });
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Deleted successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(setBlog({}));
      navigate("/", { replace: true });
    } catch (error) {
      console.error("error occured while deleting the blog ", error.status);
      if (error.status === 403) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Cannot delete this blog",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Internal error occured",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  useEffect(() => {
    fetchBlog(id);
  }, []);
  return (
    <div className="max-w-screen-xl p-4 mx-auto bg-white rounded-lg my-5 shadow-xs">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Blog
      </h2>
      <div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="w-full">
            <label
              htmlFor="title"
              className="block mb-2 text-xs font-light text-gray-900 dark:text-white"
            >
              Blog title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-gray-50 border font-light border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              disabled={true}
              value={blog.title || ""}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="author"
              className="block mb-2 text-xs  font-light text-gray-900 dark:text-white"
            >
              Blog Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              className="bg-gray-50 border font-light border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required=""
              disabled={true}
              value={blog.author || ""}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="url"
              className="block mb-2 text-xs font-light text-gray-900 dark:text-white"
            >
              Blog Url
            </label>
            <input
              type="text"
              name="url"
              id="url"
              className="bg-gray-50 border font-light border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required=""
              disabled={true}
              value={blog.url || ""}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="likes"
              className="block mb-2 text-xs font-light text-gray-900 dark:text-white"
            >
              Blog Likes
            </label>
            <input
              type="number"
              name="likes"
              id="likes"
              className="bg-gray-50 border font-light border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required=""
              disabled={true}
              value={blog.likes || 0}
            />
          </div>
          <div></div>
          <div className="flex justify-end">
            <div className="inline-flex rounded-md shadow-xs" role="group">
              <button
                onClick={() => handleLike(blog)}
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-3 h-3 me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                </svg>
                Like
              </button>
              <button
                type="button"
                onClick={() => handleDelete(blog.id)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-3 h-3 me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
        <hr className="text-gray-200 mb-4 mt-6" />
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 my-4">
          <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
            Comments:
          </h3>
          <form className="w-full" onSubmit={handleComment}>
            <label
              htmlFor="comment"
              className="block mb-2 text-xs font-light text-gray-900 dark:text-white"
            >
              New Comment
            </label>
            <input
              type="comment"
              name="comment"
              placeholder="Your comment here"
              className="focus:outline-none bg-gray-50 border font-light border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="text-white block ms-auto mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add comment
            </button>
          </form>
        </div>
        <BlogComments comments={blog.comments} />
      </div>
    </div>
  );
};

export default Blog;
