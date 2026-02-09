// components/LogoutButton.tsx
import { logoutUser } from "@/lib/api/api";
import React from "react";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      // Call the API to log the user out
      await logoutUser();
    } catch (error: unknown) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn-logout">
      Logout
    </button>
  );
};

export default LogoutButton;
