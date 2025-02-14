import PhyscisSkill from "./components/SkillPhysics";
import PhongGameplay from "./GAME/PingPong/PongGame";
import { useState } from "react"
import IntroPhong from "./GAME/PingPong/Intro"
import PhongGame3 from "./GAME/PhongGame3/PhongGame3";
import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaFilePdf } from 'react-icons/fa'; // เพิ่มไอคอนที่ต้องการจาก react-icons
import styled, { keyframes } from "styled-components";
import { get } from "lodash-es";

const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ButtonLink = styled.a`
  color: ${({ enabled }) => (enabled ? 'white' : 'black')};
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  font-size: 18px; /* ลดขนาดฟอนต์ */
  text-align: center;
  text-decoration: none;
  background-color: ${({ enabled }) => (enabled ? '#ffa12b' : '#D3D3D3')};
  display: block;
  position: relative;
  padding: 6px 10px; /* ลดขนาด padding */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-shadow: 0px 1px 0px #000;
  filter: drop-shadow(0px 1px 0px #000);
  box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #915100; /* ลดเงา */
  border-radius: 5px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ enabled }) => (enabled ? '#ffc864' : '#D3D3D3')}; /* เปลี่ยนสีปุ่ม */
    box-shadow: ${({ enabled }) => (enabled ? '0 0 15px 5px rgba(255, 255, 200, 0.8)' : 'none')}; /* เพิ่มแสงแบบ Glow */
    transform: ${({ enabled }) => (enabled ? 'scale(1.05)' : 'none')}; /* ขยายเล็กน้อย */
  }

  &:active {
    top: 8px;
    background-color: ${({ enabled }) => (enabled ? '#f78900' : '#D3D3D3')};
    box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;
  }

  pointer-events: ${({ enabled }) => (enabled  ? 'auto':'none')}; /* ป้องกันไม่ให้คลิกเมื่อไม่สามารถใช้งาน */
`;

const IconContainer = styled.div`
  position: absolute;
  top: ${({ enabled }) => (enabled ? '5px' : '7px')};
  left: ${({ position }) => position}%;
  transform: translateX(-50%);
  font-size: ${({ enabled }) => (enabled ? '20px' : '15px')};
  z-index: 5;
  color: ${({ enabled }) => (enabled ? '#ffa12b' : '#D3D3D3')};
  transition: color 0.2s ease-in-out;
`;

const ButtonShadow = styled.div`
  content: "";
  height: 100%;
  width: 100%;
  padding: 4px;
  position: absolute;
  bottom: -10px; /* ลดระยะเงา */
  left: 0;
  z-index: -1;
  background-color: #2b1800;
  border-radius: 5px;
`;

// Animation for the striped background
const move = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
`;

// Container for the progress meter
const Meter = styled.div`
  box-sizing: content-box;
  height:10px;
  position: absolute; /* Positioned absolutely within the parent */
  top: 5px; /* Adjust as needed */
  left: 0; /* Adjust as needed */
  right: 0; /* Adjust as needed */
  border-radius: 25px;
  padding: 10px;
`;

// The fill part of the meter (the actual progress bar)
const Fill = styled.span`
  display: block;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: rgb(43, 194, 83);
  background-image: linear-gradient(
    center bottom,
    rgb(43, 194, 83) 37%,
    rgb(84, 240, 84) 69%
  );
  box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
    inset 0 -2px 6px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
`;

// Striped animation overlay for the progress fill
const Stripes = styled.span`
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  z-index: 1;
  background-size: 50px 50px;
  animation: ${move} 2s linear infinite;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  overflow: hidden;
`;

const AboutMe = () => {
  const [count, setCount] = useState(1);
  function getCount(newcount) {
    setCount((prevCount) => prevCount + newcount); // Use functional form to get the latest state
  }
  return (
    <div className=" about-me-container p-6 sm:p-4 text-gray-100 w-full max-w-[95%] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-6 sm:grid-rows-5 grid-rows-auto gap-4 ">
        {/* Profile Picture */}
        <div className="group sm:col-span-2 sm:col-start-1 sm:row-start-1 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
          <h2 className="text-xl font-bold text-gray-300 mt-2">Hi, I'm [Sanphet Somjit]</h2>
          <p className="text-sm text-gray-300 mt-2">
          "Hello, I'm BAS, a 27-year-old passionate about game development and technical art, especially shaders, VFX, and coding. I am dedicated to continuous learning and self-improvement, always seeking new opportunities to refine my skills and contribute to innovative projects."
</p>
        </div>

        {/* Skills */}
        <div className="sm:col-span-2 sm:row-span-4 sm:col-start-1 sm:row-start-2 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
          <h3 className="text-6xl font-semibold text-gray-300 mt-2 mb-3">Skills</h3>
          <ul className="text-sm text-gray-300 list-disc pl-4 space-y-2">
            <li><strong>Programming Languages:</strong> C++, C#, Go, JavaScript</li>
            <li><strong>Game Engines:</strong> Unity, Unreal Engine</li>
            <li><strong>Tech Art:</strong> Unreal Materials/Niagara, Unity ShaderGraph, UnityCG, VFX Graph, HLSL</li>
            <li><strong>Game Development Expertise:</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>Multiplayer Systems:</strong> Design and implement real-time multiplayer features.</li>
                <li><strong>Flecs ECS:</strong> Proficient in Entity-Component-System architecture with Flecs.</li>
                <li><strong>Game Design Patterns:</strong> Expertise in Command, Singleton, and Object-Oriented Programming (OOP) patterns.</li>
                <li><strong>Game AI and Animation:</strong> Design complex AI behaviors and animation blending techniques.</li>
                <li><strong>Physics Programming:</strong> Worked with 2D/3D physics engines, SAT Collision Detection, and Spatial Hashing algorithms.</li>
              </ul>
            </li>
            <li><strong>Graphics APIs:</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>OpenGL:</strong> Cross-platform graphics rendering API.</li>
                <li><strong>Vulkan:</strong> Low-level, high-performance graphics API for fine control over the GPU.</li>
                <li><strong>Three.js:</strong> JavaScript library for creating 3D graphics in the web browser using WebGL.</li>
                <li><strong>Fiber React:</strong> High-performance React library focused on animation and UI rendering.</li>
              </ul>
            </li>
            <li><strong>3D Software:</strong> Maya, Houdini, ZBrush, Blender</li>
            <li><strong>Adobe Suite:</strong> Photoshop, After Effects, Lightroom, Substance 3D Painter</li>
            <li><strong>Version Control:</strong> GitHub, GitLab, Git Desktop, Git Fork</li>
            <li><strong>Databases:</strong> PostgreSQL</li>
            <li><strong>Web Development:</strong> React, Node.js</li>
          </ul>
        </div>

        {/* Work Experience */}
      <div className="sm:col-span-2 sm:row-span-2 sm:col-start-3 sm:row-start-1 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
          <h3 className="text-lg font-semibold text-gray-300 mt-2 mb-2">Work Experience</h3>
          {/* CORECELL Internship */}
          <div>
            <h4 className="text-md font-semibold text-gray-300 hover:text-yellow-400 hover:text-shadow-lg hover:cursor-pointer transition duration-200 ease-in-out"> 
              <a href="https://www.corecell.co.th/"
              target="_blank" rel="noopener noreferrer">CORECELL Internship Aug - Dec 2020</a></h4>
            <p className="text-sm text-gray-300">
              <strong>Anime Shader Research</strong>
            </p>
            <p className="text-sm text-gray-300 mt-2">
            Developed shaders to create anime-style rendering effects in Unreal Engine. The project aimed to produce an in-game model with a distinct anime aesthetic, using advanced shading techniques for a visually appealing result.
            </p>
          </div>
    
          {/* The Monk Games */}
          <div className="mt-4">
          <h4 className="text-md font-semibold text-gray-300 hover:text-yellow-400 hover:text-shadow-lg hover:cursor-pointer transition duration-200 ease-in-out"> 
          <a href="https://drive.google.com/file/d/1kEWDW5dnfjAJX0SjEI3ypfRp-k4PCRpn/view?usp=sharing"
              target="_blank" rel="noopener noreferrer">THE MONK GAMES CO., LTD Nov 2023 - Dec 2024</a></h4>
            <p className="text-sm text-gray-300">
              <strong>Unreal Game Developer Internship</strong>
            </p>
            <p className="text-sm text-gray-300 mt-2">
            Contributed to a cross-platform 3D open-world multiplayer game. Responsibilities included creating character animations with Unreal Engine's Blueprint system and implementing gameplay logic for seamless online multiplayer experiences.
            </p>
          </div>
        </div>

        {/* Future Goals */}
        <div className="sm:col-start-3 sm:row-start-3 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
        <h2 className="text-xl font-bold text-gray-300 mt-2">Future Goals</h2>
           <p className="text-sm text-gray-300 mt-2">
           <li>Become a Master in Game Dev</li>
           <li>Develop my own game engine</li>
           <li>Design and implement multiplayer</li>
           <li>Create interactive and immersive VFX</li>
           </p>
        </div>

        {/* Interests */}
        <div className="sm:col-start-3 sm:row-start-4 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
        <h2 className="text-xl font-bold text-gray-300 mt-2">Interests</h2>
           <p className="text-sm text-gray-300 mt-2">
             <li>Game Developemnt : Unity, Unreal<br/></li>
             <li>Shader development and VFX.<br/></li>
             <li>Online Game Multiplayer.<br/></li>
             <li>Graphic Programming<br/></li>
           </p>
        </div>

        {/* Profile Image Section */}
        <div className="sm:row-span-2 sm:col-start-4 sm:row-start-3 bg-slate-900 rounded-lg shadow-lg p-6 hover:bg-slate-800">
          {/* Profile Image */}
          <div className="w-full">
            <img
              src="./Profile.jpg"
              alt="Profile image description"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px", // ระยะห่างระหว่างปุ่ม
              marginTop: "20px", // เพิ่มระยะห่างจากโปรไฟล์ด้านบน
            }}>
    
            {/* Zelda-Themed Buttons */}
            <ButtonContainer >
              <ButtonLink href="https://github.com/GeekOnly?tab=repositories" 
              target="_blank" rel="noopener noreferrer" enabled={count > 30}>Github</ButtonLink>
              <ButtonShadow />
            </ButtonContainer>

            {/* Contact Button */}
            <ButtonContainer>
              <ButtonLink href="mailto:sanphetsomjit@gmail.com" enabled={count > 60}>Contact</ButtonLink>
              <ButtonShadow />
            </ButtonContainer>

            {/* CV Button */}
            <ButtonContainer>
              <ButtonLink 
              href="https://drive.google.com/file/d/1t_nE7JO7F5hiEhXaZh5a25ogMoMe2FBB/view?usp=sharing"
              target="_blank" rel="noopener noreferrer" enabled={count > 100}>CV</ButtonLink>
              <ButtonShadow />
            </ButtonContainer>
           </div>

           <div className="absolute" style={{ position: 'relative' }}>
            <Meter>
              {/* ไอคอน GitHub, Email, CV จะถูกวางที่ตำแหน่งตามค่า count */}
              <IconContainer position={30} enabled={count > 30}>
                <FaGithub />
              </IconContainer>
              <IconContainer position={60} enabled={count > 60}>
                <FaEnvelope />
              </IconContainer>
              <IconContainer position={100} enabled={count > 100}>
                <FaFilePdf />
              </IconContainer>
      
              <Fill style={{ width: `${count}%` }}>
                <Stripes />
              </Fill>
            </Meter>
           </div>
            
          </div>
      
        {/* Passion */}
        <div className="sm:col-span-2 sm:col-start-3 sm:row-start-5 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
         <h2 className="text-2xl font-bold text-gray-300 absolute -mt-5">Learning</h2>
           <div className="grid grid-cols-4 gap-5 text-sm text-gray-300 mt-4">
             <div>
               <h5 className="font-semibold">Game Dev</h5>
               <ul>
                 <li>Unity</li>
                 <li>Unreal</li>
                 <li>Bevy</li>
                 <li>Open Source</li>
               </ul>
             </div>
         
             <div>
               <h5 className="font-semibold">Tech Art</h5>
               <ul>
                 <li>VFX Grpah, Niagara</li>
                 <li>Shader, Material</li>
                 <li>Procedural Tool</li>
               </ul>
             </div>
         
             <div>
               <h5 className="font-semibold">Development</h5>
               <ul>
                 <li>Own Game Engine</li>
                 <li>Multiplayer SDK</li>
                 <li>Graphics API</li>
                 <li>Game Server</li>
               </ul>
             </div>

             <div>
               <h5 className="font-semibold">Full Stack</h5>
               <ul>
                 <li>React</li>
                 <li>Node.js, Go, Rust</li>
                 <li>PostgreSQL</li>
               </ul>
             </div>
         
           </div>
         </div>


        {/* Personal Projects */}
        <div className="sm:col-start-6 sm:row-start-1 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
        <h2 className="text-xl font-bold text-gray-300 mt-2">Passion</h2>
           <p className="text-sm text-gray-300 mt-2">
             <a>Creating Game anything and anymore.<br/></a>
           </p>
        </div>

        {/* Education */}
        <div className="sm:col-start-5 sm:row-start-1 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
          <h3 className="text-lg font-semibold text-gray-300 mt-2">Education</h3>
          <p className="text-sm text-gray-300 mt-2">
            <strong className="text-gray-300 hover:text-yellow-400 hover:text-shadow-lg hover:cursor-pointer transition duration-200 ease-in-out">
               <a href="https://www.spu.ac.th/digitalmedia/interactive-and-game/" target="_blank" rel="noopener noreferrer">SPU</a>
            </strong> BA.Interactive and Game Design
          </p>
          <p  className="text-sm text-gray-300 mt-2">
            <strong className="text-gray-300 hover:text-yellow-400 hover:text-shadow-lg hover:cursor-pointer transition duration-200 ease-in-out">
              <a href="https://www.netc.ac.th/" target="_blank" rel="noopener noreferrer">NETC</a>
            </strong> Dip.Computer Technology
          </p>
        </div>

        {/* GAME */}
        <div className="sm:col-span-2 sm:row-span-4 sm:col-start-5 sm:row-start-2 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800">
          <div className="w-full h-full overflow-hidden sm:block hidden">
             <PhongGame3 ready={true} reCount={getCount}/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutMe;
