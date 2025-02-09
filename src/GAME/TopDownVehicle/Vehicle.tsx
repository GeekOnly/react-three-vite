import { useFrame, useThree } from '@react-three/fiber'
import { useBox, useTopDownVehicle } from '@react-three/p2'
import { vec2 } from 'p2-es'
import React, { useEffect, useRef, useState } from 'react'
import type { Object3D } from 'three'
import * as THREE from 'three'

import { useControls } from '../use-controls'
import Chassis from './Chassis'

export default function Vehicle({ maxBrake = 50, steer = Math.PI / 8, force = 10 }) {
  const [steeringValue, setSteeringValue] = useState(0)

  const controls = useControls()

  const { camera } = useThree()

  const chassisBody = useRef<Object3D>(null)

  const frontWheels = {
    localPosition: vec2.fromValues(0, 0.96),
    sideFriction: 10,
  }
  const backWheels = {
    localPosition: vec2.fromValues(0, -0.66),
    sideFriction: 12,
  }

  const [, chassisApi] = useBox(
    () => ({
      args: [1.3, 3.2],
      mass: 1,
    }),
    chassisBody,
  )

  const positionHelper = useRef<[number, number]>([0, 0])

  const velocity = useRef<[number, number]>([0, 0])

  const targetHelper = useRef(new THREE.Vector3())

  const angle = useRef(0)

  const [angularVelocity, setAngularVelocity] = useState(0)

  const [sliding, setSliding] = useState(false)

  const [slides, setSlides] = useState([])

  useEffect(() => {
    chassisApi.angle.subscribe((a) => (angle.current = a))
    chassisApi.velocity.subscribe((v) => (velocity.current = v))
    chassisApi.angularVelocity.subscribe(setAngularVelocity)

    chassisApi.position.subscribe((p) => {
      vec2.rotate(positionHelper.current, [0, 10], angle.current)

      vec2.add(positionHelper.current, p, positionHelper.current)

      camera.position.lerp(
        { x: positionHelper.current[0], y: 10, z: positionHelper.current[1] } as THREE.Vector3,
        0.025,
      )

      targetHelper.current.lerp({ x: p[0], y: 0.5, z: p[1] } as THREE.Vector3, 0.075)

      camera.lookAt(targetHelper.current)
    })
  }, [])

  const [vehicle, vehicleApi] = useTopDownVehicle(() => ({
    chassisBody,
    wheels: [frontWheels, backWheels],
  }))

  const lineRef = useRef<Object3D>(null)

  useFrame(() => {
    const { forward, backward, left, right, brake } = controls.current

    setSliding(Math.abs(angularVelocity) >= 1.8)

    const _steeringValue = left || right ? steer * (left && !right ? -1 : 1) : 0

    vehicleApi.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, 1)

    vehicleApi.setSteeringValue(_steeringValue, 1)

    setSteeringValue(_steeringValue)

    vehicleApi.setBrake(brake ? maxBrake : 0, 1)
  })

  useEffect(() => {
    setSlides((s, i) => [...s, i])
  }, [sliding])

  const all = useRef({ chassisBody, lineRef })

  return (
    <group ref={vehicle}>
      <Chassis
        ref={all}
        steeringValue={steeringValue}
        velocity={velocity.current}
        angularVelocity={angularVelocity}
      />
    </group>
  )
}
