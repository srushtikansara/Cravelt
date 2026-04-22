import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";

import { AppProvider, useApp } from "./contexts/AppContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navigation } from "./components/Navigation";
import AdminMenu from "./pages/AdminMenu";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import AIAdvisorPage from "./pages/AIAdvisorPage";
import ProfilePage from "./pages/ProfilePage";
import Menu from "./pages/Menu";
import ViewDetails from "./pages/ViewDetails";
import { FoodPreferences } from "./pages/FoodPreference";
import AdminReservations from "./pages/AdminReservation";
import AdminRoute from "./components/AdminRoutes";
import {Toaster } from "react-hot-toast";

function AppRoutes({ searchText, setSearchText }) {
  const [role, setRole] = useState("user");
  const { user } = useApp();
  const location = useLocation(); // ✅ added

  return (
    <>
      <Navigation
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/restaurant/:id" element={<ViewDetails />} />
       <Route path="/menu/:restaurantId" element={<Menu />} />
        <Route
          path="/ai-advisor"
          element={
            user ? (
              <AIAdvisorPage />
            ) : (
              <Navigate to="/auth" state={{ from: location.pathname }} replace />
            )
          }
        />

        <Route
          path="/profile"
          element={
            user ? (
              <ProfilePage />
            ) : (
              <Navigate to="/auth" state={{ from: location.pathname }} replace />
            )
          }
        />

        <Route
          path="/preferences"
          element={
            user ? (
              <FoodPreferences />
            ) : (
              <Navigate to="/auth" state={{ from: location.pathname }} replace />
            )
          }
        />

        <Route path="/auth" element={<AuthPage />} />
// ✅ Two separate routes
<Route
  path="/admin/reservations"
  element={
    <AdminRoute>
      <AdminReservations />
    </AdminRoute>
  }
/>

<Route
  path="/admin/menu/:id"
  element={
    <AdminRoute>
      <AdminMenu />
    </AdminRoute>
  }
/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <ThemeProvider>
  
      <AppProvider>
        <Toaster position="bottom-right" /> {/* Example toast */}
        <AppRoutes
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </AppProvider>
    
    </ThemeProvider>
  );
}

export default App;