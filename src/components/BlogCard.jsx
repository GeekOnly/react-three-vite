import React from 'react';

const BlogCard = React.memo(({ post }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img 
        className="rounded-t-lg w-full h-56 object-cover" 
        src={post.image} 
        alt={post.title} 
        loading="lazy"/>
      </a>
      <div className="p-3">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.summary}</p>
        
        {/* แสดงแท็ก */}
        <div className="mb-3">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-gray-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={post.notion} // ลิงก์ Notion ที่จะเปิดในแท็บใหม่
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
});

export default BlogCard;
