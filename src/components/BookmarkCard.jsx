import React, { useState, useMemo, useCallback } from "react";
import './BookmarkCard.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkIcon from '@mui/icons-material/Link'; // ใช้ไอคอนสำหรับ URL ปกติ

const BookmarkCard = ({ bookmark }) => {
  // ใช้ useMemo เพื่อจำค่า bgImage เมื่อค่าของ bookmark.image หรือ bookmark.hoverImage ไม่เปลี่ยนแปลง
  const bgImage = useMemo(() => bookmark.image, [bookmark.image]);

  // ใช้ useState เพื่อจัดการการ hover และใช้ useCallback เพื่อไม่ให้ฟังก์ชันถูกสร้างใหม่ทุกครั้ง
  const [image, setImage] = useState(bgImage);

  const handleMouseEnter = useCallback(() => {
    setImage(bookmark.hoverImage || bgImage); // ใช้ภาพ hover หรือภาพเริ่มต้น
  }, [bgImage, bookmark.hoverImage]);

  const handleMouseLeave = useCallback(() => {
    setImage(bgImage); // กลับไปที่ภาพเริ่มต้น
  }, [bgImage]);

  return (
    <div
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ใช้ lazy-loading ในการโหลดภาพเมื่อภาพจะถูกแสดง */}
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {/* หากต้องการ Lazy Loading */}
        <img 
          src={image} 
          alt={bookmark.name} 
          loading="lazy" 
          style={{ display: 'none' }} // ซ่อนภาพเพื่อให้ใช้เป็นพื้นหลัง
        />
      </div>

      {/* Description Section */}
      <div className="card-description">
        <p className="text-title">{bookmark.name}</p>
        <p className="text-body">{bookmark.description}</p>

        {/* Tags Section */}
        <div className="tags-container">
          {bookmark.tags?.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons - Conditional Rendering */}
        <div className="action-buttons">
          {/* ถ้ามี URL */}
          {bookmark.url && (
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="action-button"
            >
              <LinkIcon className="button-primary" />
            </a>
          )}

          {/* ถ้ามี YouTube */}
          {bookmark.youtube && (
            <a
              href={bookmark.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="action-button"
            >
              <YouTubeIcon className="button-primary" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;
