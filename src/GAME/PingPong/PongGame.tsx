import { Text, useGLTF, useTexture,Sky } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, useBox, useCircle, usePlane } from '@react-three/p2'
import { useRef } from 'react'
import * as THREE from 'three'
import { proxy, useSnapshot } from 'valtio'
import './styles.css'

import earthImg from './resources/cross.jpg'
import pingSound from './resources/ping.mp3'

const ping = new Audio(pingSound)
const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

const state = proxy({
  count: 0,
  api: {
    pong(velocity) {
      velocity = Math.abs(velocity)
      ping.currentTime = 0
      ping.volume = clamp(velocity / 20, 0, 1)
      ping.play()
      if (velocity > 4) ++state.count
    },
    reset: () => (state.count = 0),
  },
})

function Paddle({ speed = 10,getCount }) {
  const model = useRef()
  const maxSpeed = 10; // กำหนดความเร็วสูงสุดของ Paddle
  const pos = useRef([0, 0])
  const { count } = useSnapshot(state)
  const { nodes, materials } = useGLTF('/pingpong.glb')
  const [ref, api] = useBox(() => ({
    type: 'Kinematic',
    args: [3.3, 0.4],
    onCollide: (e) => {
      state.api.pong(e.contact.impactVelocity)
      getCount(1) // Update the count when the paddle collides
    },  
  }))
  api.position.subscribe((p) => (pos.current = p))

  // ติดตามตำแหน่งของเมาส์ในขณะเคลื่อนไหว
  useFrame((state) => {
    // ตรวจสอบว่าตำแหน่งของ Paddle หลุดจากขอบจอหรือไม่
  if (pos.current[0] < -5 || pos.current[0] > 5 || pos.current[1] < -5 || pos.current[1] > 5) {
    // รีเซ็ตตำแหน่งของ Paddle กลับไปที่จุดเริ่มต้น (0, 0)
    api.position.set(0, 0, 0)
  }

    model.current.rotation.x = THREE.MathUtils.lerp(model.current.rotation.x, 0, 0.2)
    model.current.rotation.y = THREE.MathUtils.lerp(
      model.current.rotation.y,
      (state.mouse.x * Math.PI) / 5,
      0.2,
    )
    // setting a rigid body position directly causes weird collision glitches
    // for example the ball can fall through the paddle if moved towards each other
    // angle in theory the same but speeds are different in this case
    api.velocity.set(
      clamp((state.mouse.x * 5 - pos.current[0]) * speed, -maxSpeed, maxSpeed),
      clamp((state.mouse.y * 5 - pos.current[1]) * speed * 2, -maxSpeed, maxSpeed)
    );
    api.angle.set(model.current.rotation.y)
  })
  return (
    <mesh ref={ref} dispose={null}>
      <group ref={model} position={[-0.05, 0, 0.3]} scale={0.15}>
        <Text
          anchorX="center"
          anchorY="middle"
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 1, 0]}
          fontSize={10}
          children={count}
        />
        <group rotation={[1.88, -0.35, 2.32]} scale={[2.97, 2.97, 2.97]}>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone003} />
          <primitive object={nodes.Bone006} />
          <primitive object={nodes.Bone010} />
          <skinnedMesh
            castShadow
            receiveShadow
            material={materials.glove}
            material-roughness={1}
            geometry={nodes.arm.geometry}
            skeleton={nodes.arm.skeleton}
          />
        </group>
        <group rotation={[0, -0.04, 0]} scale={141.94}>
          <mesh castShadow receiveShadow material={materials.wood} geometry={nodes.mesh.geometry} />
          <mesh castShadow receiveShadow material={materials.side} geometry={nodes.mesh_1.geometry} />
          <mesh castShadow receiveShadow material={materials.foam} geometry={nodes.mesh_2.geometry} />
          <mesh castShadow receiveShadow material={materials.lower} geometry={nodes.mesh_3.geometry} />
          <mesh castShadow receiveShadow material={materials.upper} geometry={nodes.mesh_4.geometry} />
        </group>
      </group>
    </mesh>
  )
}

function Ball() {
  const map = useTexture(earthImg)
  const [ref, api] = useCircle(() => ({
    mass: 1,
    args: [0.5],
    position: [0, 10],
  }))
  usePlane(() => ({
    type: 'Static',
    position: [0, -10],
    onCollideBegin: () => {
      api.position.set(0, 5)
      api.velocity.set(0, 5)
      state.api.reset()
    },
  }))

  return (
    <mesh castShadow ref={ref}>
      <sphereGeometry args={[0.5, 64, 64]} />
      <meshStandardMaterial map={map} />
    </mesh>
  )
}

export default function PhongGameplay({ ready = true , getCount}) {
  return (
    <Canvas onCreated={state => state.gl.setClearColor("red")} shadows camera={{ position: [0, 5, 12], fov: 50 }}>
      <color attach="background" args={['red']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.4}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <Sky distance={450000} sunPosition={[1, 1, 0]} inclination={0.6} azimuth={0.25} />
      <Physics
        maxSubSteps={20}
        gravity={[0, -40]}
        normalIndex={2}
        defaultContactMaterial={{
          friction: 0.9,
          restitution: 0.7,
          stiffness: 1e7,
          relaxation: 1,
          frictionStiffness: 1e7,
          frictionRelaxation: 2,
        }}
      >
        <mesh position={[0, 0, -10]} receiveShadow>
          <planeGeometry args={[1000, 1000]} />
          <meshPhongMaterial color="#374037" />
        </mesh>
        {ready && <Ball />}
        <Paddle getCount={getCount} />
      </Physics>
    </Canvas>
  )
}
