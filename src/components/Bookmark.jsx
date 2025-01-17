import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import BookmarkCard from "./BookmarkCard";

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filterTag, setFilterTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const bookmarksPerPage = 15;

  const dropdownRef = useRef(null);

  useEffect(() => {
    // Load Bookmark data
    fetch("/data/bookmarks.json")
      .then((response) => response.json())
      .then((data) => setBookmarks(data))
      .catch((error) => console.error("Error fetching bookmarks:", error));

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

  const handleReadMore = (bookmark) => {
    setSelectedBookmark(bookmark);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBookmark(null);
  };

  // Filter and Search Logic for Bookmarks with Memoization
  const filteredBookmarks = useMemo(() => {
    return bookmarks
      .filter((bookmark) =>
        bookmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .filter((bookmark) => {
        if (filterTag === "All") return true;
        return bookmark.tags.includes(filterTag);
      })
      .filter((bookmark) => {
        if (selectedTags.length === 0) return true;
        return selectedTags.every(tag => bookmark.tags.includes(tag));
      });
  }, [bookmarks, searchTerm, filterTag, selectedTags]);

  // Pagination Logic with Memoization
  const indexOfLastBookmark = useMemo(() => currentPage * bookmarksPerPage, [currentPage]);
  const indexOfFirstBookmark = useMemo(() => indexOfLastBookmark - bookmarksPerPage, [indexOfLastBookmark]);
  const currentBookmarks = useMemo(() => filteredBookmarks.slice(indexOfFirstBookmark, indexOfLastBookmark), [filteredBookmarks, indexOfFirstBookmark, indexOfLastBookmark]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  // Get all unique tags for related tags with Memoization
  const allTags = useMemo(() => [...new Set(bookmarks.flatMap((bookmark) => bookmark.tags))], [bookmarks]);

  const filteredTags = useMemo(() => allTags.filter((tag) =>
    filteredBookmarks.some((bookmark) => bookmark.tags.includes(tag))
  ), [allTags, filteredBookmarks]);

  const handleTagSelection = useCallback((tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Search and Filter for Bookmarks */}
      <form className="max-w-lg mx-auto">
        <div className="flex relative">
          {/* Dropdown for Category */}
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

          {dropdownVisible && (
            <div
              ref={dropdownRef}
              className="absolute bg-black divide-y divide-gray-100 rounded-s-xl shadow w-44 dark:bg-gray-700 z-10"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
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
                {["Tech", "React", "Full Stack", "GameDev"].map((category) => (
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
            <button
              onClick={() => setSelectedTags([])}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Show All Tags
            </button>
          </div>
        </div>
      )}

      {/* Bookmark Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
        {currentBookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} onClick={() => handleReadMore(bookmark)} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        {Array.from({ length: Math.ceil(filteredBookmarks.length / bookmarksPerPage) }, (_, index) => (
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

export default BookmarkList;
