"use server";
import { cookies } from "next/headers";

export async function setCookie(key: string, value: string, options = {}) {
  const cookieJar = await cookies();
  cookieJar.set(key, value, options);
}

export async function getUserLocation() {
  const cookieStore = await cookies();
  let userLocation = cookieStore.get("user_location")?.value;

  if (!userLocation || userLocation === "undefined") {
    // Fetch geolocation if not found in cookies
    const geoLocationRes = await fetch(
      `https://ipinfo.io/json?token=${process.env.IPINFO_API_KEY}`
    );
    const geoLocation = await geoLocationRes.json();
    userLocation = geoLocation.country;
    console.log("USER LOCATION", userLocation);

    // Set the cookie with the location
    await setCookie("user_location", userLocation, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  }

  return userLocation;
}
