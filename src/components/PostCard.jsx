import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";

// Helper function to truncate text
const truncateText = (text, maxLength) => {
  if (!text) return ""; // Return an empty string if `text` is undefined or null
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

function PostCard({ $id, title, featuredImage, content }) {
  const snippet = truncateText(content, 100); // Truncate content to a fixed length
  const filePreviewURL = featuredImage
    ? appwriteService.previewFile(featuredImage)
    : "https://source.unsplash.com/300x300/?random"; // Fallback image

  return (
    <Link to={`/post/${$id}`} className="block h-full">
      <div className="max-w-sm h-full p-6 rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-200">
        <img
          src={filePreviewURL}
          alt={title || "Post Image"}
          className="object-cover object-center w-full rounded-lg h-40 bg-gray-300"
        />
        <div className="mt-4 flex-1 flex flex-col justify-between">
          <h2 className="text-lg font-semibold tracking-wide text-gray-900 mt-2">
            {truncateText(title,45) || "Untitled Post"}
          </h2>
          <div className="text-gray-600 text-sm line-clamp-2 mt-2">{parse(snippet)}</div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
