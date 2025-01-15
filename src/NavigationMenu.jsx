import React, { useState } from 'react';
import { Link } from 'react-scroll';
import styled from 'styled-components';

// แยกการจัดการสไตล์ของ LeftMiddle
const LeftMiddle = styled.div`
  position: fixed;
  top: 50%;
  right: 2vw;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    display: none; /* ซ่อนเมนูในมือถือ */
  }
`;

const MobileNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: none; /* ซ่อนเมนูในเริ่มต้น */
  transition: opacity 0.3s ease;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  
  &.active {
    display: flex; /* แสดงเมนูเมื่อเปิด */
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  margin: 12px 0;
  text-transform: uppercase;
  position: relative;
  transition: color 0.3s, transform 0.3s ease, padding-left 0.3s ease;

  &:hover {
    cursor: pointer;
    color: #ff6347;
    transform: scale(1.1);
    padding-left: 10px;
  }

  &:focus {
    color: rgb(160, 255, 71);
    transform: scale(1.1);
  }

  &::before {
    content: '→';
    position: absolute;
    left: -20px;
    font-size: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  z-index: 20;
  cursor: pointer;

  div {
    width: 30px;
    height: 5px;
    background-color: white;
    transition: transform 0.3s ease;
  }

  &.open div:nth-child(1) {
    transform: rotate(45deg) translateY(7px);
  }

  &.open div:nth-child(2) {
    opacity: 0;
  }

  &.open div:nth-child(3) {
    transform: rotate(-45deg) translateY(-7px);
  }
`;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e, to) => {
    console.log(`Clicked on: ${to}`);
    console.log('Event:', e);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="navigation" >
        <Hamburger className={isOpen ? 'open' : ''} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </Hamburger>
    
        <LeftMiddle className={isOpen ? 'active' : ''}>
          <StyledLink to="home" smooth={true} duration={500} onClick={(e) => handleClick(e, 'home')}>Start</StyledLink>
          <StyledLink to="about" smooth={true} duration={500} onClick={(e) => handleClick(e, 'about')}>About</StyledLink>
          <StyledLink to="projects" smooth={true} duration={500} onClick={(e) => handleClick(e, 'projects')}>Projects</StyledLink>
          <StyledLink to="blog" smooth={true} duration={500} onClick={(e) => handleClick(e, 'blog')}>Blogs</StyledLink>
          <StyledLink to="bookmark" smooth={true} duration={500} onClick={(e) => handleClick(e, 'bookmark')}>Bookmark</StyledLink>
          <StyledLink to="credit" smooth={true} duration={500} onClick={(e) => handleClick(e, 'credit')}>Credit</StyledLink>
        </LeftMiddle>
      </nav>
    </div>
  );
}
