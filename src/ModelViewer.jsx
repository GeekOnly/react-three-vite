import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshReflectorMaterial,Box } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import { Model } from "./Comuputer";

import * as dat from 'dat.gui'; // ใช้ dat.GUI สำหรับ Debug UI

const DebugUI = ({ bloomEffect, setBloomEffect, depthEffect, setDepthEffect, cameraPosition, setCameraPosition }) => {
    const gui = useRef(null);
  
    useEffect(() => {
      // Only create the GUI if it hasn't been created yet
      if (!gui.current) {
        gui.current = new dat.GUI();
        gui.current.add(bloomEffect, 'intensity', 0, 10).name('Bloom Intensity').onChange(value => {
          setBloomEffect(prev => ({ ...prev, intensity: value }));
        });

        // Depth of Field Controllers
        gui.current.add(depthEffect, 'focalLength', 0, 1).name('Focal Length').onChange(value => {
          setDepthEffect(prev => ({ ...prev, focalLength: value }));
        });
        gui.current.add(depthEffect, 'bokehScale', 1, 50).name('Bokeh Scale').onChange(value => {
          setDepthEffect(prev => ({ ...prev, bokehScale: value }));
        });
        gui.current.add(depthEffect, 'blur', 0, 2).name('Blur').onChange(value => {
          setDepthEffect(prev => ({ ...prev, blur: value }));
        });

        // การควบคุมตำแหน่งของ Camera
        const cameraFolder = gui.current.addFolder('Camera Position');
        cameraFolder.add(cameraPosition, 'x', -10, 10).name('Position X').onChange(value => {
          setCameraPosition(prev => ({ ...prev, x: value }));
        });
        cameraFolder.add(cameraPosition, 'y', -10, 10).name('Position Y').onChange(value => {
          setCameraPosition(prev => ({ ...prev, y: value }));
        });
        cameraFolder.add(cameraPosition, 'z', -10, 20).name('Position Z').onChange(value => {
          setCameraPosition(prev => ({ ...prev, z: value }));
        });
        cameraFolder.open(); // เปิด folder ของ Camera Position โดยอัตโนมัติ
      }
  
      // Cleanup the GUI when the component is unmounted
      return () => {
        if (gui.current && gui.current.GUI) {
          gui.current.destroy();
        }
      };
    }, [bloomEffect, setBloomEffect, depthEffect, setDepthEffect, cameraPosition, setCameraPosition]);
  
    return null;
  };

  const SceneContainer = () => {
    const cameraRef = useRef();
    const [bloomEffect, setBloomEffect] = useState({ intensity: 5 });
    const [depthEffect, setDepthEffect] = useState({ focalLength: 0.3, bokehScale: 15, blur: 1 });
    const [cameraPosition, setCameraPosition] = useState({ x: -1.5, y: 1, z: 8 });
  
    useEffect(() => {
      console.log("Bloom Effect: ", bloomEffect); // ตรวจสอบค่าใน console
    }, [bloomEffect, depthEffect,cameraPosition]);
  
    return (
      <div style={{ height: '100vh', width: '100%', backgroundColor: '#202020' }}>
        <Canvas 
          shadows 
          dpr={[1, 1.5]} 
          camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }} 
          ref={cameraRef}
        >
          <color attach="background" args={['#202020']} />
          <ambientLight intensity={0.3} />
          <hemisphereLight intensity={0.15} groundColor="black" />
          <spotLight position={[10, 20, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
  
          <Suspense fallback={null}>
            <Model scale={0.75} position={[0,-2,0]} />
          </Suspense>

          

           {/* Plane reflections + distance blur */}
           <mesh receiveShadow position={[-0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]}/>
          <MeshReflectorMaterial
            blur={[300, 30]}
            resolution={2048}
            mixBlur={1}
            mixStrength={180}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#202020"
            metalness={0.8}
          />
           </mesh>

          <EffectComposer disableNormalPass>
            <Bloom 
              luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={bloomEffect.intensity}  // ส่งค่าที่อัปเดตจาก state
            />
            <DepthOfField 
            focalLength={depthEffect.focalLength} 
            bokehScale={depthEffect.bokehScale} 
            blur={depthEffect.blur}
          />
          </EffectComposer>
  
          <DebugUI 
          bloomEffect={bloomEffect} 
          setBloomEffect={setBloomEffect}
          depthEffect={depthEffect} 
          setDepthEffect={setDepthEffect}
          cameraPosition={cameraPosition}
          setCameraPosition={setCameraPosition}
        />

        </Canvas>
      </div>
    );
  };

export default SceneContainer;
