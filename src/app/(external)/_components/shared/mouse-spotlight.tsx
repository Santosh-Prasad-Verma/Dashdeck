"use client";

import { useEffect, useState } from "react";

export function MouseSpotlight() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[1] hidden md:block"
      style={{
        left: position.x,
        top: position.y,
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        transition: "left 0.3s ease-out, top 0.3s ease-out",
      }}
    />
  );
}
