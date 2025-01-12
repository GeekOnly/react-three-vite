import React from "react";

const BlogDetails = ({ post, onBack }) => {
  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
      >
        Back to List
      </button>

      <div className="bg-white border border-gray-300 rounded-lg shadow-lg">
        {/* Image */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />

        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-semibold text-gray-800">{post.title}</h1>
          
          {/* Author and Date */}
          <div className="mt-2 text-sm text-gray-500">
            <span>{post.author}</span> | <span>{post.date}</span>
          </div>

          {/* Content */}
          <div className="mt-4 text-gray-700">
            <p>{post.content}</p>
          </div>

          {/* Tags */}
          <div className="mt-4">
            <h4 className="font-semibold">Tags:</h4>
            <div className="mt-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-700 mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Table Section */}
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Attribute</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 text-sm text-gray-600">Post ID</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{post.id}</td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 text-sm text-gray-600">Author</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{post.author}</td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 text-sm text-gray-600">Date</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{post.date}</td>
                </tr>
                <tr className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 text-sm text-gray-600">Tags</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {post.tags.join(", ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
