import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="max-w-screen-xl p-4 mx-auto bg-white rounded-lg my-5 shadow-xs">
      <h4 className="text-xl font-light text-center mb-3">
        Welcome to Blospost App {user && user.username || "Guest"}
      </h4>
      <h2 className="text-2xl font-light text-center">
        Easily <span className="text-red-500">add blogs</span>,{" "}
        <span className="text-red-500">like them</span>,{" "}
        <span className="text-red-500">comment</span>,{" "}
        <span className="text-red-500">delete</span>, and {""}
        <span className="text-red-500">view</span> users—all in one place. Enjoy
        the app!
      </h2>
    </div>
  );
};

export default Header;
