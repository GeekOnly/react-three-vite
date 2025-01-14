import { lazy } from 'react'

const TopDownVehicle = { Component: lazy(() => import('./TopDownVehicle')) }
const PingPong = { Component: lazy(() => import('./PingPong')) }


export {
  PingPong,
  TopDownVehicle,
}
