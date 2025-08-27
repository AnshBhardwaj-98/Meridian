import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    forceNew: true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    transports: ["websocket"],
  };
  const backendURL = import.meta.env.VITE_BACKEND_CONNECTION_URL || "/";
  return io(backendURL, options);
};
