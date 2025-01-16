import PhyscisSkill from "./components/SkillPhysics";
import PhongGameplay from "./GAME/PingPong/PongGame";
import { useState } from "react";

const AboutMe = () => {
  const [count, setCount] = useState(1);
  function getCount(newcount) {
    setCount((prevCount) => prevCount + newcount); // Use functional form to get the latest state
  }
  return (
    <div className="about-me-container p-6 sm:p-4 text-gray-100 w-full max-w-[95%] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-6 sm:grid-rows-5 grid-rows-auto gap-4">
        {/* Profile Picture */}
        <div className="sm:col-start-5 sm:row-start-1 bg-stone-900 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-300 mt-2">Notable Projects</h3>
          <p className="text-sm text-gray-300 mt-2">
            <strong>Survival Zombie 2D:</strong> Developed combat mechanics and AI behaviors for a 2D top-down shooter.
          </p>
        </div>

        {/* Introduction */}
        <div className="sm:col-start-3 sm:row-start-3 bg-stone-900 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-300 mt-2">Future Goals</h3>
          <p className="text-sm text-gray-300 mt-2">
            Continue improving my skills in AI and procedural generation while creating immersive virtual worlds.
          </p>
        </div>

        {/* Skills */}
        <div className="sm:col-span-2 sm:col-start-3 sm:row-start-5 bg-slate-950 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-300 mt-2">Passion</h3>
          <p className="text-sm text-gray-300 mt-2">
            <strong>Survival Zombie 2D:</strong> Developed combat mechanics and AI behaviors for a 2D top-down shooter.
          </p>
          <p className="text-sm text-gray-300">
            Check out my <a href="https://github.com" className="text-blue-600 underline">GitHub</a> for more projects.
          </p>
        </div>

        {/* Skill Experience */}
        <div className="sm:col-span-2 sm:row-span-4 sm:col-start-5 sm:row-start-2 bg-stone-600 rounded-lg shadow-lg p-4">
          <div className="w-full h-[600px] overflow-hidden sm:block hidden">
            <h3>{count}</h3>
            <PhongGameplay getCount={getCount}/>
          </div>
        </div>

        {/* Education */}
        <div className="sm:col-span-2 sm:row-span-4 sm:col-start-1 sm:row-start-2 bg-stone-900 rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold text-gray-300 mt-2 mb-3">Skills</h3>
          <ul className="text-sm text-gray-300 list-disc pl-4 space-y-2">
          {count > 5 && (<li><strong>Programming Languages:</strong> C++, C#, Python</li>)}
          {count > 10 &&<li><strong>Game Engines:</strong> Unity, Unreal Engine</li>}
          {count > 15 &&<li><strong>Tools:</strong> Blender, Git, Substance Painter</li>}
          {count > 20 &&<li><strong>Frameworks:</strong> .NET, Flask, Django</li>}
          {count > 25 &&<li><strong>Databases:</strong> MySQL, PostgreSQL, MongoDB</li>}
          {count > 30 &&<li><strong>Version Control:</strong> Git, GitHub, GitLab</li>}
          {count > 35 &&<li><strong>Cloud Services:</strong> AWS, Google Cloud, Azure</li>}
          {count > 45 &&<li><strong>AI & Machine Learning:</strong> TensorFlow, PyTorch, Scikit-learn</li>}
          {count > 55 &&<li><strong>Web Development:</strong> React, Next.js, Node.js</li>}
          {count > 60 &&<li><strong>Game Development Techniques:</strong> ECS, Procedural Generation, Multiplayer Networking</li>}
          </ul>
        </div>

        {/* Interests */}
        <div className="sm:col-span-2 sm:row-span-2 sm:col-start-3 sm:row-start-1 bg-stone-900 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-300 mt-2 mb-2">Work Experience</h3>
          <p className="text-sm text-gray-300">
            <strong>Game Developer at XYZ Studio</strong>
          </p>
          <ul className="text-sm list-disc pl-4 space-y-1 mt-2">
            <li>Developed game mechanics for an open-world RPG.</li>
            <li>Collaborated with the art team to integrate models and animations.</li>
          </ul>
        </div>

        {/* Notable Projects */}
        <div className="sm:row-span-2 sm:col-start-4 sm:row-start-3 bg-stone-900 rounded-lg shadow-lg p-4">
        <p className="text-sm text-gray-300 mt-2">
         <img
           src="./Profile.jpg"
           alt="Profile image description"
           className="h-full w-full object-cover rounded-lg"
         />
       </p>
        </div>

        {/* Future Goals */}
        <div className="sm:col-start-6 sm:row-start-1 bg-stone-900 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-300 mt-2">Personal Projects</h3>
          <p className="text-sm text-gray-300 mt-2">
            Building a custom game engine and working on a 3D physics-based game prototype.
          </p>
        </div>

        {/* Personal Projects */}
        <div className="sm:col-span-2 sm:col-start-1 sm:row-start-1 bg-stone-900 rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-bold text-gray-300 mt-2">Hi, I'm [Your Name]</h2>
          <p className="text-sm text-gray-300 mt-2">
            A passionate Game Developer and Tech Artist with a focus on creating immersive gameplay experiences and cutting-edge game graphics.
          </p>
        </div>

        {/* Recent Publications */}
        <div className="sm:col-start-3 sm:row-start-4 bg-stone-900 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-300 mt-2">Interests</h3>
          <p className="text-sm text-gray-300 mt-2">
            Exploring new game mechanics, VR/AR technologies, and participating in game jams.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
