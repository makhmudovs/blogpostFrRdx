import { useSelector } from "react-redux";

const Notification = () => {
  const { message, type } = useSelector(
    (state) => state.notification.notification
  );

  if (!message) return null;
  console.log("message", message);
  console.log("type", type);
  const colors = {
    info: "text-blue-800 dark:text-blue-400 bg-blue-50",
    success: "text-green-800 dark:text-green-400 bg-green-50",
    error: "text-red-800 dark:text-red-400 bg-red-50",
  };

  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm rounded-lg dark:bg-gray-800 ${
        colors[type] || "text-gray-800 bg-gray-50"
      }`}
      role={type}
      aria-live="assertive"
    >
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">{type}</span>
      <div>
        <span className="font-medium capitalize">{type}!</span> {message}
      </div>
    </div>
  );
};

export default Notification;
