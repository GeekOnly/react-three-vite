import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects } from './constants/index.js';
import CanvasLoader from './components/Loading.jsx';
import DemoComputer from './components/DemoComputer.jsx';

import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import './Projects.css';

const groupedProjects = myProjects.reduce((acc, project) => {
  if (!acc[project.type]) acc[project.type] = [];
  acc[project.type].push(project);
  return acc;
}, {});

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [currentType, setCurrentType] = useState(Object.keys(groupedProjects)[0]); // Default to the first type

  const projectsByType = groupedProjects[currentType] || [];
  const currentProject = projectsByType[selectedProjectIndex];

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectsByType.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectsByType.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  const handleCategoryChange = (type) => {
    setCurrentType(type);
    setSelectedProjectIndex(0); // Reset index when switching categories
  };

  useGSAP(() => {
    gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
  }, [selectedProjectIndex, currentType]);

  return (
    <section className="c-space my-20 relative">
       {/* Category Tabs */}
       <section className="c-space my-20 relative">
         {/* Category Tabs */}
         <div className="category-tabs flex gap-5 mb-10">
           {Object.keys(groupedProjects).map((type) => (
             <button
               type="button"
               key={type}
               className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
               onClick={() => handleCategoryChange(type)}
             >
               {type}
               <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                 {groupedProjects[type].length} {/* จำนวนโปรเจกต์ในประเภทนี้ */}
               </span>
             </button>
           ))}
         </div>
       </section>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        {/* Project Details */}
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 rounded-xl bg-slate-800">
          <div className="absolute top-0 right-0">
            <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" />
          </div>

          <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
            <img className="w-10 h-10 shadow-sm" src={currentProject.logo} alt="logo" />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>
            <p className="text-white animatedText">{currentProject.desc}</p>
            <p className="text-white animatedText">{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img 
                  src={tag.path} 
                  alt={tag.name}
                  style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                </div>
              ))}
            </div>

            <a
              className="flex text-white items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p>Check Live Site</p>
              <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
            </a>
          </div>

          <div className="flex justify-between items-center mt-7">
            <IconButton className="arrow-btn" onClick={() => handleNavigation('previous')}>
              <ArrowCircleLeftOutlinedIcon className="arrow_icon" fontSize="large" />
            </IconButton>

            <IconButton className="arrow-btn" onClick={() => handleNavigation('next')}>
              <ArrowCircleRightOutlinedIcon className="arrow_icon" fontSize="large" />
            </IconButton>
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={currentProject.texture} />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Projects;
