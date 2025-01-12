import { suspend } from 'suspend-react'
import { useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, MeshReflectorMaterial,BakeShadows,Html } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, ToneMapping } from '@react-three/postprocessing';
import { easing } from 'maath'
import {Instances, Computers } from "./Computers";
import CameraRig from './CameraRigController';
import { Text } from '@react-three/drei'; // Import Text component
import AutoFocusDOF from './AutoFocusDOF'

const suzi = import('@pmndrs/assets/models/bunny.glb')


const SceneContainer = () => {
    const [size, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Handle window resize
    useEffect(() => {
      const handleResize = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <div style={{ width: size.width, height: size.height, backgroundColor: '#202020' }}>
         <Canvas shadows dpr={[1, 1.5]} camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }} eventSource={document.getElementById('root')} eventPrefix="client">
       {/* Lights */}
      <color attach="background" args={['black']} />
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight decay={0} position={[10, 20, 10]} angle={0.12} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} />
  
      {/* Main scene */}
         <group position={[-0, -1.25, 0]} rotation={[0, -Math.PI * -.02, 0]}>
         <Instances>
                <Computers scale={.7}/>
         </Instances>  

           {/* Plane reflections + distance blur */}
           <mesh receiveShadow position={[-0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
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
           {/* Bunny and a light give it more realism */}
           <Bun scale={0.4} position={[0, 0.3, 0.5]} rotation={[0, -Math.PI * 0.85, 0]} />
           <pointLight distance={1.5} intensity={1} position={[-0.15, 0.7, 0]} color="orange" />
        </group>

          {/* Postprocessing */}
         <EffectComposer disableNormalPass>
         <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={5} />
         <DepthOfField target={[0, 0, 13]} focalLength={0.6} bokehScale={15} height={700} />

          <EffectComposer>
          <AutoFocusDOF
            bokehScale={10} //blur scale
            resolution={1024} //resolution (decrease for performance)
            mouseFocus //if false, the center of the screen will be the focus
            focusSpeed={0.05} // milliseconds to focus a new detected mesh
            focalLength={0.01} //how far the focus should go
          />
         </EffectComposer>
         </EffectComposer>
         <CameraRig />        
         <BakeShadows />

         {/* 3D Text */}
        <Text
          position={[0, -0.9, 1]}  // Position of text in the scene
          fontSize={.1}            // Font size
          color="white"          // Text color
          maxWidth={200}         // Maximum width
          lineHeight={1}         // Line height for multi-line text
          letterSpacing={0.1}    // Spacing between letters
          textAlign="center"     // Align text to center
        >
          Sanphet Somjit
        </Text>

        {/* 3D GAME Deverloper Text */}
        <Text
          position={[0, -1.1, 1]}  // Position of text in the scene
          fontSize={.15}            // Font size
          color="white"          // Text color
          maxWidth={200}         // Maximum width
          lineHeight={1}         // Line height for multi-line text
          letterSpacing={0.1}    // Spacing between letters
          textAlign="center"     // Align text to center
        >
          Game Dev & Tech ART & Programmer
        </Text>

        

        </Canvas>

      </div>
    );
  };

export default SceneContainer;

function Bun(props) {
    const { nodes } = useGLTF(suspend(suzi).default)
    console.log(nodes)
    return (
      <mesh receiveShadow castShadow geometry={nodes.mesh.geometry} {...props}>
        <meshStandardMaterial color="#222" roughness={0.5} />
      </mesh>
    )
  }