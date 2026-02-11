"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";
export const SetCookie = () => {
  useEffect(() => {
    Cookies.set("currentFoundation", "Nivaran");
  }, []);
  return <></>;
};
