const AboutMe = () => {
    return (
        <div className="about-me-container p-6 sm:p-4 bg-gray-900 text-gray-100 w-full max-w-[95%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-6 grid-rows-auto sm:grid-rows-5 gap-2">
          {/* Profile Picture */}
          <div className="flex items-center justify-center bg-stone-900 rounded-lg shadow-lg sm:col-span-2 sm:row-span-4 sm:col-start-1 sm:row-start-2">
            <img
              src="./gif/A.gif"
              alt="Profile"
              className="rounded-full w-3/4 h-auto border-4 border-gray-300"
            />
          </div>
      
          {/* Introduction */}
          <div className="bg-stone-900 rounded-lg shadow-lg p-4 sm:col-span-2 sm:col-start-1 sm:row-start-1">
            <h2 className="text-xl font-bold text-gray-300 mt-2">Hi, I'm [Your Name]</h2>
            <p className="text-sm text-gray-300 mt-2">
              A passionate Game Developer and Tech Artist with a focus on creating
              immersive gameplay experiences and cutting-edge game graphics.
            </p>
          </div>
      
          {/* Skills */}
          <div className="bg-stone-900 rounded-lg shadow-lg p-4 sm:col-span-2 sm:row-span-5 sm:col-start-3 sm:row-start-1">
            <h3 className="text-lg font-semibold text-gray-300 mt-2 mb-3">Skills</h3>
            <ul className="text-sm text-gray-300 list-disc pl-4 space-y-2">
              <li>
                <strong>Programming Languages:</strong> C++, C#, Python
              </li>
              <li>
                <strong>Game Engines:</strong> Unity, Unreal Engine
              </li>
              <li>
                <strong>Tools:</strong> Blender, Git, Substance Painter
              </li>
            </ul>
          </div>
      
          {/* Work Experience */}
          <div className="bg-stone-900 rounded-lg shadow-lg p-4 sm:col-span-2 sm:row-span-2 sm:col-start-5 sm:row-start-2">
            <h3 className="text-lg font-semibold text-gray-300 mt-2 mb-2">Work Experience</h3>
            <p className="text-sm text-gray-300">
              <strong>Game Developer at XYZ Studio</strong>
            </p>
            <ul className="text-sm list-disc pl-4 space-y-1 mt-2">
              <li>Developed game mechanics for an open-world RPG.</li>
              <li>Collaborated with the art team to integrate models and animations.</li>
            </ul>
          </div>
      
          {/* Education */}
          <div className="bg-stone-900 rounded-lg shadow-lg p-4 sm:col-start-5 sm:row-start-1">
            <h3 className="text-lg font-semibold text-gray-300 mt-2">Education</h3>
            <p className="text-sm text-gray-300 mt-2">
              <strong>Bachelor's in Computer Science</strong> - University of [Your
              University Name]
            </p>
          </div>
      
          {/* Interests */}
          <div className="bg-stone-900 rounded-lg shadow-lg p-4 sm:col-start-6 sm:row-start-1">
            <h3 className="text-lg font-semibold text-gray-300 mt-2">Interests</h3>
            <p className="text-sm text-gray-300 mt-2">
              Exploring new game mechanics, VR/AR technologies, and participating in game jams.
            </p>
          </div>
      
          {/* Notable Projects */}
          <div className="bg-stone-900 rounded-lg shadow-lg p-4 sm:row-span-2 sm:col-start-5 sm:row-start-4">
            <h3 className="text-lg font-semibold text-gray-300 mt-2">Notable Projects</h3>
            <p className="text-sm text-gray-300 mt-2">
              <strong>Survival Zombie 2D:</strong> Developed combat mechanics and AI behaviors for a 2D top-down shooter.
            </p>
            <p className="text-sm text-gray-300">
              Check out my <a href="https://github.com" className="text-blue-600 underline">GitHub</a> for more projects.
            </p>
          </div>
      
          {/* Future Goals */}
          <div className="bg-stone-900 rounded-lg shadow-lg p-4 sm:row-span-2 sm:col-start-6 sm:row-start-4">
            <h3 className="text-lg font-semibold text-gray-300 mt-2">Future Goals</h3>
            <p className="text-sm text-gray-300 mt-2">
              Continue improving my skills in AI and procedural generation while
              creating immersive virtual worlds.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AboutMe;
  