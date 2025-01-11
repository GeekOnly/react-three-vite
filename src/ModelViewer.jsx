import { suspend } from 'suspend-react'
import { Canvas,useFrame } from "@react-three/fiber";
import { useGLTF, MeshReflectorMaterial,BakeShadows } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, ToneMapping } from '@react-three/postprocessing';
import { easing } from 'maath'
import {Instances, Computers } from "./Computers";
import CameraRig from './CameraRigController';

const suzi = import('@pmndrs/assets/models/bunny.glb')

const SceneContainer = () => {
    return (
      <div style={{ height: '100vh', width: '100%', backgroundColor: '#202020' }}>
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
         <DepthOfField target={[0, 0, 13]} focalLength={0.3} bokehScale={15} height={700} />
         </EffectComposer>
         <CameraRig />        
         <BakeShadows />
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