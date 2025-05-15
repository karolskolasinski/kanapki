import React from "react";

export default function Loading() {
  return (
    <div className="flex space-x-2 justify-center items-center h-24">
      <div className="h-4 w-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="h-4 w-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="h-4 w-4 bg-gray-400 rounded-full animate-bounce" />
    </div>
  );
}
