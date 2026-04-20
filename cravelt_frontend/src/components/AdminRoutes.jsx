import { Navigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

export default function AdminRoute({ children }) {
  const { role } = useApp();
  return role === "admin" ? children : <Navigate to="/" />;
}