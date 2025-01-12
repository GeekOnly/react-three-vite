import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function HPLevel() {
  const [hp, setHp] = useState(100); // เริ่มต้น HP ที่ 100

  useEffect(() => {
    // ตัวอย่างการอัพเดท HP
    const interval = setInterval(() => {
      setHp((prevHp) => {
        if (prevHp > 0) return prevHp - 1; // ลด HP ทุกๆ 1 วินาที
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval); // หยุดการลด HP เมื่อคอมโพเนนต์ถูกทำลาย
  }, []);

  return (
    <motion.div
      style={{
        position: 'static', // ใช้ position: fixed เพื่อไม่ให้เลื่อนตาม
        top: '10px',
        left: '10px',
        color: '#fff',
        fontSize: '2em',
        fontWeight: 'bold',
        zIndex: 1000, // เพิ่ม z-index เพื่อให้แสดงอยู่บนสุด
      }}
      animate={{ opacity: hp > 0 ? 1 : 0 }} // ทำให้มันหายไปเมื่อ HP = 0
      transition={{ duration: 0.5 }}>
      <div>HP: {hp}</div> {/* แสดง HP */}
    </motion.div>
  );
}
