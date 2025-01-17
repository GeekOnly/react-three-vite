import PhyscisSkill from "./components/SkillPhysics";
import PhongGameplay from "./GAME/PingPong/PongGame";
import { useState } from "react"
import IntroPhong from "./GAME/PingPong/Intro"

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
          <li><strong>Tech Art:</strong> Unreal Material/Niagara, Unity ShaderGraph, UnityCG, VFX Graph, HLSL</li>
          <li><strong>Game Development Skills:</strong>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Multiplayer Systems:</strong> Design and implementation of real-time multiplayer functionality.</li>
              <li><strong>Flecs ECS:</strong> Experience with Entity Component System architecture using Flecs.</li>
              <li><strong>Game Design Patterns:</strong> Command, Singleton, OOP for structuring game systems.</li>
              <li><strong>Game AI and Animation Technical:</strong> Designing AI behaviors and animation blending techniques.</li>
              <li><strong>Physics Programming:</strong> 2D/3D physics engines, SAT Collision Detection, Spatial Hashing.</li>
            </ul>
          </li>
          <li><strong>Graphics API:</strong>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>OpenGL:</strong> Graphics rendering API used for cross-platform graphics applications.</li>
              <li><strong>Vulkan:</strong> Low-level graphics API offering high performance and control over the GPU.</li>
              <li><strong>Three.js:</strong> JavaScript library for 3D graphics in the web browser, built on top of WebGL.</li>
              <li><strong>Fiber React:</strong> A React library for building high-performance user interfaces, with a focus on animation.</li>
            </ul>
          </li>
          <li><strong>3D Tools:</strong> Maya, Houdini, ZBrush, Blender</li>
          <li><strong>Adobe Tools:</strong> Photoshop, After Effects, Lightroom, Substance 3D Painter</li>
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
            <h4 className="text-md font-semibold text-gray-300">CORECELL Internship Aug - Dec 2020</h4>
            <p className="text-sm text-gray-300">
              <strong>Anime Shader Research</strong>
            </p>
            <p className="text-sm text-gray-300 mt-2">
            Developed shaders to create anime-style rendering effects in Unreal Engine. The project aimed to produce an in-game model with a distinct anime aesthetic, using advanced shading techniques for a visually appealing result.
            </p>
          </div>
    
          {/* The Monk Games */}
          <div className="mt-4">
            <h4 className="text-md font-semibold text-gray-300">THE MONK GAMES CO., LTD</h4>
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
             - Master Vulkan.<br/>
             - Build my own game engine<br/>
             - Improve multiplayer game systems<br/>
           </p>
        </div>

        {/* Interests */}
        <div className="sm:col-start-3 sm:row-start-4 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
        <h2 className="text-xl font-bold text-gray-300 mt-2">Interests</h2>
           <p className="text-sm text-gray-300 mt-2">
             - Shader development and VFX.<br/>
             - AI programming.<br/>
             - Real-time multiplayer systems.<br/>
             - Low-level graphics programming.
           </p>
        </div>

        {/* Profile Image */}
        <div className="sm:row-span-2 sm:col-start-4 sm:row-start-3 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
        <p className="text-sm w-full text-gray-300 mt-2">
         <img
           src="./Profile.jpg"
           alt="Profile image description"
           className="h-full w-full object-cover rounded-lg"
         />
       </p>
        </div>

        {/* Passion */}
        <div className="sm:col-span-2 sm:col-start-3 sm:row-start-5 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
        <h2 className="text-xl font-bold text-gray-300 mt-2">Personal Projects</h2>
           <p className="text-sm text-gray-300 mt-2">
             - Real-time multiplayer game engine (Node.js, React).<br/>
             - Procedural world generation with Flecs ECS and Vulkan.<br/>
             - Shader-based adventure game with dynamic visuals.<br/>
             - AI-driven NPC behavior with procedural content generation.
           </p>
        
        </div>

        {/* Personal Projects */}
        <div className="sm:col-start-6 sm:row-start-1 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
        <h2 className="text-xl font-bold text-gray-300 mt-2">Passion</h2>
           <p className="text-sm text-gray-300 mt-2">
             - Creating Game anything and anymore.<br/>
           </p>
        </div>

        {/* Education */}
        <div className="sm:col-start-5 sm:row-start-1 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
          <h3 className="text-lg font-semibold text-gray-300 mt-2">Education</h3>
          <p className="text-sm text-gray-300 mt-2">
            <strong>SPU</strong> Interactive and Game Design
          </p>
          <p className="text-sm text-gray-300 mt-2">
            <strong>NETC</strong> Computer Technology
          </p>
        </div>

        {/* GAME */}
        <div className="sm:col-span-2 sm:row-span-4 sm:col-start-5 sm:row-start-2 bg-slate-900 rounded-lg shadow-lg p-4 hover:bg-slate-800 hover:opacity-90">
         <h3 className="text-6xl font-semibold text-gray-300 mt-2">GAME</h3>
          <div className="w-full h-[600px] overflow-hidden sm:block hidden">
            <h3>{count}</h3>
            <PhongGameplay getCount={getCount}/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutMe;
