import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    // Load JSON data
    fetch("/data/posts.json")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // Filter and Search Logic
  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((post) => (filterTag === "All" ? true : post.tags.includes(filterTag)));

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
      {/* Search and Filter */}
      <form className="max-w-lg mx-auto">
        <div className="flex">
          {/* Dropdown Button for Categories */}
          <button
            type="button"
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            {filterTag || "All Categories"}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 z-50">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {["All", "Mockups", "Templates", "Design", "Logos"].map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => {
                        setFilterTag(category);
                        setDropdownVisible(false);
                      }}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Search Input */}
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block p-2.5 w-full text-sm bg-gray-50 border border-gray-300 rounded-e-lg dark:bg-gray-700 dark:border-gray-600"
              placeholder="Search Mockups, Logos, Design Templates..."
            />
          </div>
        </div>
      </form>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
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
            className={`px-4 py-2 mx-1 ${
              currentPage === index + 1 ? "bg-blue-600" : "bg-blue-500"
            } text-white rounded-md hover:bg-blue-700`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
