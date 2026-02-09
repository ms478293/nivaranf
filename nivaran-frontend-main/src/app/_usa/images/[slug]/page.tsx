"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ImageDisplayPage() {
  const param = useParams();
  const { slug } = param;

  const [imageExists, setImageExists] = useState(false);
  const url = `/usa/${slug}.png`;

  useEffect(() => {
    // Check if the image exists
    fetch(url, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setImageExists(true);
        } else {
          setImageExists(false);
        }
      })
      .catch(() => setImageExists(false));
  }, [url]);

  return (
    <div className="relative w-full min-h-screen h-full">
      {imageExists ? (
        <Image
          fill
          src={url}
          alt={`Image for ${slug}`}
          className="object-contain"
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Image not found</p>
        </div>
      )}
    </div>
  );
}
