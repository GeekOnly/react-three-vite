import { extend, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export default function Line({
  offset,
  object,
  cut = true,
  active = true,
  width = 0.03,
  color = 0xffffff,
  opacity = 1,
  maxLength = 10,
}) {
  const count = useRef(0)

  const points = useMemo(() => [], [])

  const _offset = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(() => {
    if (!object.current || (!cut && count.current >= maxLength) || !active) return
    _offset.current.copy(offset)
    object.current.localToWorld(_offset.current)
    if (Number.isNaN(_offset.current.x)) return
    points.splice(0, 0, _offset.current.clone())
    points.splice(maxLength, 1)
    count.current += 1
  })

  return (
    <mesh>
    </mesh>
  )
}
