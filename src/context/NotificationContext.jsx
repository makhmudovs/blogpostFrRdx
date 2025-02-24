import { createContext, useContext, useReducer } from "react";

// Default state
const defaultState = {
  message: "",
  messageType: "info",
};

// Create contexts with default values
const NotificationContext = createContext(defaultState);
const NotificationDispatchContext = createContext(() => {
  throw new Error(
    "NotificationDispatchContext must be used within a NotificationProvider"
  );
});

// Reducer function
function notificationReducer(state, action) {
  switch (action.type) {
    case "setMessage":
      return {
        ...state,
        message: action.message,
        messageType: action.messageType,
      };
    case "clearMessage":
      return { ...state, message: "" }; // Clear the message but keep the messageType
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Provider component
// eslint-disable-next-line react/prop-types
export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, defaultState);

  return (
    <NotificationContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationContext.Provider>
  );
}

// Custom hooks for using the context
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}

export function useNotificationDispatch() {
  const context = useContext(NotificationDispatchContext);
  if (!context) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationProvider"
    );
  }
  return context;
}