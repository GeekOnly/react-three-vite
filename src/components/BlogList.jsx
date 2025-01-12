import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    // Load JSON data
    fetch("./data/posts.json")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  // Filter and Search Logic
  const filteredPosts = posts
    .filter((post) => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((post) => (filterTag === "All" ? true : post.tags.includes(filterTag)))
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-lg w-full"
        />
      </div>

      {/* Filter */}
      <div className="mb-4">
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="All">All Tags</option>
          <option value="Tech">Tech</option>
          <option value="Design">Design</option>
          <option value="Web">Web</option>
          <option value="React">React</option>
          <option value="Backend">Backend</option>
        </select>
      </div>

      {/* Sort */}
      <div className="mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {currentPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogList;