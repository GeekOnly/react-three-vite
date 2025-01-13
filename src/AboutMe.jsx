import { Profile } from "./components/Profile";
import PhyscisSkill from "./components/SkillPhysics";

const AboutMe = () => {
  return (
    <div className="about-me-container p-6 sm:p-4 bg-gray-950 text-gray-100 w-full max-w-[95%] mx-auto">
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
        <div className="sm:col-span-2 sm:col-start-3 sm:row-start-5 bg-stone-900 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-300 mt-2">Passion</h3>
          <p className="text-sm text-gray-300 mt-2">
            <strong>Survival Zombie 2D:</strong> Developed combat mechanics and AI behaviors for a 2D top-down shooter.
          </p>
          <p className="text-sm text-gray-300">
            Check out my <a href="https://github.com" className="text-blue-600 underline">GitHub</a> for more projects.
          </p>
        </div>

        {/* Skill Experience */}
        <div className="sm:col-span-2 sm:row-span-4 sm:col-start-5 sm:row-start-2 bg-stone-900 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-300 mt-2">Pj.js</h3>
          <div className="w-full h-full overflow-hidden sm:block hidden">
                 <PhyscisSkill />
           </div>
        </div>

        {/* Education */}
        <div className="sm:col-span-2 sm:row-span-4 sm:col-start-1 sm:row-start-2 bg-stone-900 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-semibold text-gray-300 mt-2 mb-3">Skills</h3>
          <ul className="text-sm text-gray-300 list-disc pl-4 space-y-2">
            <li><strong>Programming Languages:</strong> C++, C#, Python</li>
            <li><strong>Game Engines:</strong> Unity, Unreal Engine</li>
            <li><strong>Tools:</strong> Blender, Git, Substance Painter</li>
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
              alt="Profile"
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
