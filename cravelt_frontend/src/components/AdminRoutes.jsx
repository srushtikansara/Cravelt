import { Navigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";

export default function AdminRoute({ children }) {
  const { role, loading } = useApp();
  
  if (loading) return null; // ✅ wait, don't redirect yet
  if (role !== "admin") return <Navigate to="/" replace />;
  
  return children;
}