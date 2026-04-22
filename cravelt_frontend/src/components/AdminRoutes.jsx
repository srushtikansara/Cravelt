import { Navigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

export default function AdminRoute({ children }) {
  const { role, loading } = useApp();
  
  if (loading) return null; // wait for auth to load
  
  return role === "admin" ? children : <Navigate to="/" />;
}