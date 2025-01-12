import React, { useState, useEffect } from "react";

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const bookmarksPerPage = 20;

  useEffect(() => {
    // Load JSON data (Example for bookmark data)
    fetch("./data/bookmarks.json")
      .then((response) => response.json())
      .then((data) => setBookmarks(data));
  }, []);

  // Filter and Search Logic
  const filteredBookmarks = bookmarks
    .filter(
      (bookmark) =>
        bookmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((bookmark) => (filterTag === "All" ? true : bookmark.tags.includes(filterTag)));

  // Paginate Logic
  const indexOfLastBookmark = currentPage * bookmarksPerPage;
  const indexOfFirstBookmark = indexOfLastBookmark - bookmarksPerPage;
  const currentBookmarks = filteredBookmarks.slice(indexOfFirstBookmark, indexOfLastBookmark);

  // Pagination Buttons
  const totalPages = Math.ceil(filteredBookmarks.length / bookmarksPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-6">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search bookmarks..."
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
        </select>
      </div>

      {/* Bookmark Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentBookmarks.map((bookmark) => (
          <div key={bookmark.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
              <img className="rounded-t-lg w-full h-56 object-cover" src={bookmark.image} alt={bookmark.name} />
            </a>
            <div className="p-5">
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{bookmark.name}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{bookmark.description}</p>
              <div className="flex flex-wrap gap-2">
                {bookmark.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-4 py-2 mx-1 border rounded-lg ${currentPage === number ? "bg-blue-500 text-white" : "bg-white text-blue-500 border-blue-500"}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookmarkList;
