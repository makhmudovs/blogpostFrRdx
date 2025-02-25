import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setNotification,
  clearNotification,
} from "../features/notificationSlice";
import { setBlogs } from "../features/blogSlice";
import { deleteBlog, getAll, updateBlog, createBlog } from "../request";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";
import { getTokenConfig } from "../utils";

const Blogs = () => {
  const [showBlogForm, setShowBlogForm] = useState("");
  const { blogs } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getBlogs = async () => {
    try {
      const blogs = await getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      console.error("error while fetching blogs ", error);
    }
  };

  const handleNewBlog = async (blog) => {
    const config = getTokenConfig();
    if (config === null) {
      navigate("/login", { replace: true });
    }

    try {
      await createBlog(blog, config);
      getBlogs();
      dispatch(
        setNotification({ message: "Created successfully", type: "success" })
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 2500);
    } catch (error) {
      console.error("error while creating a blog ", error.message);
      dispatch(
        setNotification({ message: error.response.data.error, type: "error" })
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 2500);
    }
  };

  const handleLike = async (blog) => {
    const config = getTokenConfig();
    if (config === null) {
      navigate("/login", { replace: true });
    }
    try {
      const updatedBlog = await updateBlog(
        blog.id,
        {
          ...blog,
          likes: blog.likes + 1,
        },
        config
      );
      if (updatedBlog) {
        getBlogs();
        dispatch(
          setNotification({ message: "Liked successfully", type: "success" })
        );
        setTimeout(() => {
          dispatch(clearNotification());
        }, 2500);
      }
    } catch (error) {
      console.error("error occured while liking the blog ", error);
      dispatch(
        setNotification({ message: "error.response.data.error", type: "error" })
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 2500);
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
      getBlogs();
      dispatch(
        setNotification({ message: "Deleted Successfully", type: "success" })
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 2500);
    } catch (error) {
      console.error("error occured while deleting the blog ", error);
      dispatch(
        setNotification({ message: error.response.data.error, type: "error" })
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 2500);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-extrabold dark:text-white mb-4">Blogs</h1>
        <button
          type="button"
          onClick={() => setShowBlogForm(!showBlogForm)}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Add new blog
        </button>
      </div>

      <div className={`my-8 ${showBlogForm ? "" : "hidden"}`}>
        <BlogForm handleNewBlog={handleNewBlog} />
      </div>
      <div className="w-full lg:w-3/5 mx-auto">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Blog
              handleLike={handleLike}
              handleDelete={handleDelete}
              key={blog.id}
              blog={blog}
            />
          ))
        ) : (
          <div>No blogs found plz add...</div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
