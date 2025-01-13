import { Link } from 'react-scroll';
import styled from 'styled-components';

// แยกการจัดการสไตล์ของ LeftMiddle
const LeftMiddle = styled.div`
  position: absolute;
  color: white;
  bottom: 50%;
  right: 6vw;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 3em;
  letter-spacing: -0.01em;
  font-size: 22px;
  transform: rotate(40deg) translate3d(1, 1, 0);
  transform-origin: 100% 100%;
  z-index: 10; /* Bring the link to the front */
`;

const StyledLink = styled(Link)`
  color: white; /* กำหนดสีเริ่มต้นของข้อความ */
  text-decoration: none; /* เอาเส้นใต้ของลิงก์ออก */
  display: inline-block; /* ให้สามารถจัดการขนาดได้ */
  transform: rotate(-40deg); /*
  transition: rotate(40deg) transform 0.3s ease, color 0.3s ease; /* เพิ่ม transition */

  &:hover {
    cursor: pointer; /* เปลี่ยน cursor เมื่อ hover */
    color: #ff6347; /* เปลี่ยนสีข้อความเมื่อ hover */
    transform: scale(1.2); /* ขยายและหมุน */
    animation: shake 0.3s infinite; /* เพิ่มการสั่น */
  }

  &:focus {
    transform: scale(1.2) rotate(25deg); /* ขยายและหมุน */
    color: rgb(160, 255, 71); /* เปลี่ยนสีเมื่อได้รับ focus */
    transform: scale(1.1); /* เพิ่มการขยายเล็กน้อย */
  }

  @keyframes shake {
    0% { transform: translateX(-2px) rotate(-40deg); }
    50% { transform: translateX(2px) rotate(-40deg); }
    100% { transform: translateX(-2px) rotate(-40deg); }
  }
`;

export default function Navigation() {
  // ฟังก์ชันสำหรับ debug เมื่อมีการคลิก
  const handleClick = (e, to) => {
    console.log(`Clicked on: ${to}`);
    // ตัวอย่างการตรวจสอบพฤติกรรมต่าง ๆ ของคลิก
    console.log('Event:', e);
  };

  return (
    <nav className="navigation">
      <LeftMiddle>
        <StyledLink
          to="home"
          smooth={true}
          duration={500}
          onClick={(e) => handleClick(e, 'home')}
        >
          Home      
        </StyledLink>

        <StyledLink
          to="about"
          smooth={true}
          duration={500}
          onClick={(e) => handleClick(e, 'about')}
        >
          About  
        </StyledLink>

        <StyledLink
          to="projects"
          smooth={true}
          duration={500}
          onClick={(e) => handleClick(e, 'home')}        >
          Project     
        </StyledLink>

        <StyledLink
          to="blog"
          smooth={true}
          duration={500}
          onClick={(e) => handleClick(e, 'home')}
        >
          Blogs  
        </StyledLink>

        <StyledLink
          to="bookmark"
          smooth={true}
          duration={500}
          onClick={(e) => handleClick(e, 'bookmark')}
        >
          Bookmark
        </StyledLink>
      </LeftMiddle>
    </nav>
  );
}
