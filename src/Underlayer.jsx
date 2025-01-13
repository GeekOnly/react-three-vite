import styled ,{ keyframes } from 'styled-components'
import React, { useState, useEffect } from 'react';

const BottomRight = styled.div`
  position: absolute;
  color: white;
  bottom: 6vw;
  right: 6vw;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  text-align: right;
`
// Define the Hamburger styled component
const Hamburger = styled.div`
  position: absolute;
  color: white;
  display: flex;
  flex-direction: column;
  top: 6vw;
  right: 6vw;
  cursor: pointer;
  z-index: 10;

  & > div {
    position: relative;
    width: 24px;
    height: 2px;
    background: rgb(255, 255, 255);
    margin-bottom: 6px;
    transition: all 0.3s ease;
  }

  &.open > div:nth-child(1) {
    transform: rotate(45deg) translateY(8px);
  }

  &.open > div:nth-child(2) {
    opacity: 0;
  }

  &.open > div:nth-child(3) {
    transform: rotate(-45deg) translateY(-8px);
  }
`;

const MenuItem = styled.a`
  color: white;
  top: 6vw;
  left: 6vw;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: min(10vw, 5em);
  src: url('./Expose-Regular.otf') format('opentype');
  font-weight: normal;
  font-style: normal;

   &:hover {
    cursor: pointer; /* เปลี่ยน cursor เมื่อ hover */
    color: #ff6347;  /* เปลี่ยนสีข้อความเป็นสีที่ต้องการ (ตัวอย่าง: tomato) */
    background-color: rgba(255, 255, 255, 0); /* เพิ่มสีพื้นหลังเมื่อ hover */
  }

  &:focus {
    color:rgb(160, 255, 71); /* เปลี่ยนสีเมื่อได้รับ focus */
    background-color: rgba(178, 15, 243, 0); /* เพิ่มพื้นหลัง */
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 15, 15, 0.64);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
  z-index: 5;
`;

const slideColor = keyframes`
  0% {
    background-color: #FF5733;  // สีเริ่มต้น
  }
  33% {
    background-color: #33FF57;  // สีที่ 2
  }
  66% {
    background-color: #5733FF;  // สีที่ 3
  }
  100% {
    background-color: #FF5733;  // กลับไปที่สีเริ่มต้น
  }
`;

export default function Underlay() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentText, setCurrentText] = useState('Unity'); // Default text state
    const [textIndex, setTextIndex] = useState(0); // To track current text index
    const textArray = ['Unity', 'Unreal', 'C++', 'C#']; // Text values to cycle through

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    // Change text every 2 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }, 2000);
  
      return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);
  
    useEffect(() => {
      setCurrentText(textArray[textIndex]); // Update the current text based on the index
    }, [textIndex]);
    
  return (
    <>

      <BottomRight>
        2025
        <br />
        Happy New Year
        <br />
        Sanphet Somjit
      </BottomRight>

      {/* Link Special*/}
      <Hamburger vertical={true} className={isOpen ? "open" : ""} onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </Hamburger>
      <Overlay open={isOpen} className="navigation">
        <MenuItem>Sanphet</MenuItem>
        <MenuItem>About Me</MenuItem>
        <MenuItem>Game Showcase</MenuItem>
        <MenuItem>Projects</MenuItem>
        <MenuItem>Blogs</MenuItem>
        <MenuItem>Bookmarks</MenuItem>
      </Overlay>
    </>
  )
}
