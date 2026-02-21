"use client";

import Cookies from "js-cookie";
import React from "react";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      await fetch("/api/content/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error: unknown) {
      console.error("Failed to log out:", error);
    } finally {
      Cookies.remove("authToken");
      Cookies.remove("refreshToken");
      Cookies.remove("currentFoundation");
      window.location.replace("/content-login");
    }
  };

  return (
    <button onClick={handleLogout} className="btn-logout">
      Logout
    </button>
  );
};

export default LogoutButton;
