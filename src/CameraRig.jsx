import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";

function CameraRig() {
  useEffect(() => {
    const handleOrientation = (event) => {
      const { alpha, beta, gamma } = event; // ค่ามุม rotation ของอุปกรณ์
      if (cameraRef.current) {
        // แปลงค่า alpha, beta, gamma เป็นการหมุนใน Three.js
        const rotation = new THREE.Euler(
          THREE.MathUtils.degToRad(beta - 90), // หมุนรอบแกน X
          THREE.MathUtils.degToRad(alpha),    // หมุนรอบแกน Y
          THREE.MathUtils.degToRad(gamma)     // หมุนรอบแกน Z
        );

        cameraRef.current.quaternion.setFromEuler(rotation);
      }
    };

    // เริ่มฟัง DeviceOrientation
    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      // ล้าง event listener เมื่อ component ถูกลบ
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const cameraRef = useRef();

  // อัปเดตกล้องใน useFrame
  useFrame((state, delta) => {
    const targetPosition = [0, 0, 5.5]; // ตำแหน่งเริ่มต้นของกล้อง
    if (cameraRef.current) {
      easing.damp3(state.camera.position, targetPosition, 0.5, delta);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return <perspectiveCamera ref={cameraRef} />;
}

export default CameraRig;