import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setNotification,
  clearNotification,
} from "../features/notificationSlice";
import { setBlogs } from "../features/blogSlice";
import { getAll, createBlog } from "../request";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";
import { getTokenConfig } from "../utils";

const Blogs = () => {
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

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="p-4 max-w-screen-xl mx-auto my-5 bg-white rounded-lg shadow-xs">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-extrabold dark:text-white mb-4">Blogs</h1>
        <BlogForm handleNewBlog={handleNewBlog} />
      </div>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div>No blogs found plz add...</div>
      )}
    </div>
  );
};

export default Blogs;
