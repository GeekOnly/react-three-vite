import React from "react";

const BlogDetails = ({ post, onBack }) => {
  return (
    <div>
      <button onClick={onBack} className="mb-4 text-blue-500">Back</button>
      {post && post.notion ? (
        <a href={post.notion} target="_blank" rel="noopener noreferrer">
          Open Notion Page
        </a>
      ) : (
        <div>No Notion URL provided</div>
      )}
    </div>
  );
};

export default BlogDetails;
