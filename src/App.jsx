import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";

function App() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-screen w-screen">
      <div className="max-w-screen-xl mx-auto">
        <Navbar />
        <Notification/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
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
