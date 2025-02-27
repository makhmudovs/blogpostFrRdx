import axios from "axios";
import {
  blogSlice
} from "./features/blogSlice";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const loginUser = async (creds) => {
  const request = await axios.post("/api/login", creds);
  const response = await request.data;
  return response;
};

const updateBlog = async (id, blog, config) => {
  const {
    user,
    ...restItems
  } = blog;
  const req = await axios.put(`${baseUrl}/${id}`, restItems, config);
  return await req.data;
};

const deleteBlog = async (id, config) => {
  const req = await axios.delete(`${baseUrl}/${id}`, config);
  return await req.data;
};

const createBlog = async (newBlog, config) => {
  const req = await axios.post(`${baseUrl}`, newBlog, config);
  return await req.data;
};

const createComment = async (id, comment) => {
  const req = await axios.post(`${baseUrl}/comment/${id}`, {
    comments: comment
  });
  const res = await req.data;
  return res;
};

const getUsers = async () => {
  const response = await axios.get('/api/users');
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
};

export {
  getAll,
  loginUser,
  setToken,
  updateBlog,
  deleteBlog,
  createBlog,
  getBlog,
  createComment,
  getUsers,
  getUser
};