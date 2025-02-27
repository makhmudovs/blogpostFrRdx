import { Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import Header from "./components/Header";
import Blog from "./pages/Blog";
import Users from "./pages/Users";
import User from "./pages/User";

function App() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-screen">
      <Navbar />
      <div className="p-4">
        <Notification />
        <Header />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route
            path="*"
            element={
              <div className="text-5xl text-center text-red-600">404</div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
