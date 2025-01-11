import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";

function CameraRig() {
  const cameraRef = useRef();
  const isMobile = useRef(false);
  const tilt = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // ตรวจสอบว่าเป็นมือถือหรือไม่
    isMobile.current =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      );

    if (isMobile.current && window.DeviceOrientationEvent) {
      const handleOrientation = (eventData) => {
        // อ่านค่าจาก eventData
        const tiltX = Math.round(eventData.gamma * 2); // หมุนแนวนอน
        const tiltY = Math.round(eventData.beta * 2);  // หมุนแนวตั้ง

        // บันทึกค่า tilt
        tilt.current.x = tiltX / 100; // ปรับ scale ให้เหมาะสม
        tilt.current.y = tiltY / 100;
      };

      // ฟัง DeviceOrientationEvent
      window.addEventListener("deviceorientation", handleOrientation, false);

      return () => {
        window.removeEventListener("deviceorientation", handleOrientation, false);
      };
    }
  }, []);

  // อัปเดตกล้องใน useFrame
  useFrame((state, delta) => {
    const targetPosition = [0, 0, 5.5]; // ตำแหน่งเริ่มต้นของกล้อง

    if (cameraRef.current) {
      if (isMobile.current) {
        // ใช้ tilt ที่ได้รับจาก gyroscope
        easing.damp3(
          state.camera.position,
          [tilt.current.x, tilt.current.y, 5.5],
          0.5,
          delta
        );
      } else {
        // ใช้เมาส์สำหรับคอมพิวเตอร์
        const { x, y } = state.pointer;
        easing.damp3(
          state.camera.position,
          [-1 + (x * state.viewport.width) / 3, (1 + y) / 2, 5.5],
          0.5,
          delta
        );
      }

      state.camera.lookAt(0, 0, 0);
    }
  });

  return <perspectiveCamera ref={cameraRef} />;
}

export default CameraRig;
