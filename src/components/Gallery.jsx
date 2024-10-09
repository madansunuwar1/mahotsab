import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductGallery({ images }) {
  // Accept images as a prop
  const [mainImage, setMainImage] = useState(images[0] || null); // Default to the first image
  const [thumbnails, setThumbnails] = useState(images); // Set thumbnails from images prop
  function convertImage(url) {
    // Use regex to add "haat" before "/media"
    return url.replace(/(\/)(media\/)/, "$1haat/$2");
  }
  return (
    <div className="flex flex-col">
      {/* Main Image Frame */}
      <div className="mt-1 mb-4">
        {mainImage && (
          <img
            src={convertImage(mainImage)}
            alt="Product"
            className="w-full h-64 md:h-[370px] object-cover border border-gray-300 rounded-lg shadow-lg"
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-4 overflow-x-auto pb-2 md:pb-0">
        {thumbnails.map((image, index) => (
          <img
            key={index}
            src={convertImage(image)}
            alt={`Thumbnail ${index + 1}`}
            className="w-20 h-20 object-cover cursor-pointer border-2 border-transparent hover:border-gray-400 rounded-lg"
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
