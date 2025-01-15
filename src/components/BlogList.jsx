import React, { useState, useEffect, useRef } from "react";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]); // Track multiple selected tags
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filterTag, setFilterTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  const dropdownRef = useRef(null); // Ref for dropdown menu

  useEffect(() => {
    // Load JSON data
    fetch("/data/posts.json")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));

    // Close the dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter and Search Logic
  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((post) => {
      if (filterTag === "All") return true;
      return post.tags.includes(filterTag);
    })
    .filter((post) => {
      if (selectedTags.length === 0) return true;
      return selectedTags.every(tag => post.tags.includes(tag));
    });

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get all unique tags for related tags
  const allTags = [...new Set(posts.flatMap((post) => post.tags))];

  const filteredTags = allTags.filter((tag) =>
    filteredPosts.some((post) => post.tags.includes(tag))
  );

  // Handle tag selection
  const handleTagSelection = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag) // Deselect tag
        : [...prevTags, tag] // Select tag
    );
  };

  return (
    <div className="container mx-auto p-6">
      {/* Search and Filter */}
      <form className="max-w-lg mx-auto">
        <div className="flex relative">
          {/* Dropdown Button */}
          <button
            type="button"
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium bg-gray-400 border border-gray-300 rounded-s-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:border-gray-600"
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
            <div
              ref={dropdownRef} // Add ref to dropdown
              className="absolute bg-black divide-y divide-gray-100 rounded-s-xl shadow w-44 dark:bg-gray-700 z-10"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {/* All Categories Option */}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterTag("All");
                      setDropdownVisible(false);
                    }}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    All Categories
                  </button>
                </li>

                {/* Categories */}
                {["Unity", "Unreal", "TechArt", "Full Stack", "GameDev"].map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => {
                        setFilterTag(category);
                        setDropdownVisible(false);
                      }}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
              placeholder="Search..."
            />
          </div>
        </div>
      </form>

      {/* Display Related Tags */}
      {filteredTags.length > 0 && (
        <div className="mt-4 text-center">
          <div className="mt-2">
            <div className="flex flex-wrap justify-center">
              {filteredTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagSelection(tag)}
                  className={`inline-block text-gray-700 text-sm px-3 py-1 rounded-md m-1 hover:bg-gray-300 
                    ${selectedTags.includes(tag) ? "bg-blue-200 border-2 border-blue-400" : "bg-gray-200"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {/* Show "Show All Tags" Button */}
            <button
              onClick={() => setSelectedTags([])}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Show All Tags
            </button>
          </div>
        </div>
      )}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
            className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? "bg-blue-600" : "bg-blue-500"} text-white rounded-md hover:bg-blue-700`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
