import React, { useState } from "react";
import './BookmarkCard.css';

const BookmarkCard = ({ bookmark }) => {
  // สร้าง state สำหรับจัดการภาพพื้นหลังเมื่อวางเมาส์
  const [bgImage, setBgImage] = useState(bookmark.image);

  const handleMouseEnter = () => {
    setBgImage(bookmark.hoverImage || bookmark.image); // ใช้ภาพสำรองเมื่อมี hoverImage
  };

  const handleMouseLeave = () => {
    setBgImage(bookmark.image); // กลับไปที่ภาพเริ่มต้น
  };

  return (
    <div
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* GIF Background */}
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>

      {/* Description Section */}
      <div className="card-description">
        <p className="text-title">{bookmark.name}</p>
        <p className="text-body">{bookmark.description}</p>

        {/* Tags Section */}
        <div className="tags-container">
          {bookmark.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <a
          href={bookmark.link}
          target="_blank"
          rel="noopener noreferrer"
          className="card-button"
        >
          Visit
        </a>
      </div>
    </div>
  );
};

export default BookmarkCard;
