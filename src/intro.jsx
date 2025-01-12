import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Animation สำหรับ fade in/out
const RoleBlock = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const Text = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #FC5404;
  font-size: 150px;
  text-align: left;
  text-transform: uppercase;
  transition: opacity 1.5s ease, transform 1.5s ease; /* ใช้ transition */
  opacity: ${({ isFadingOut }) => (isFadingOut ? 0 : 1)};
  transform: ${({ isFadingOut }) => (isFadingOut ? 'translateY(0px)' : 'translateY(-10px)')};

  span {
    opacity: 0.5;
    margin-right: 5px;
    font-weight: 300;
  }
`;

const Intro = () => {
  const texts = ['Unreal', 'Unity', 'TechART', 'C++', 'C#'];
  const [currentText, setCurrentText] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // เริ่ม fade out
      setIsFadingOut(true);

      // เปลี่ยนข้อความหลังจาก fade out
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % texts.length); // เปลี่ยนข้อความ
        setTimeout(() => setIsFadingOut(false), 100); // เริ่ม fade in พร้อมดีเลย์เล็กน้อย
      }, 1500); // ระยะเวลา fade out
    }, 3000); // รอบเวลาของข้อความแต่ละอัน

    return () => clearInterval(interval);
  }, []);

  return (
    <RoleBlock>
      <Text isFadingOut={isFadingOut}>
        {texts[currentText]}
      </Text>

    </RoleBlock>
  );
};

export default Intro;
