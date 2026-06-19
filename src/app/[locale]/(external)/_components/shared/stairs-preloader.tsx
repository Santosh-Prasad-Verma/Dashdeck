"use client";

import { useEffect, useState } from "react";

export function StairsPreloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#050505",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "100%",
              backgroundColor: "#10b981",
              transformOrigin: "top",
              animation: `stairReveal 0.8s cubic-bezier(0.76, 0, 0.24, 1) ${0.08 * i + 0.8}s forwards`,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "relative",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: 600,
          letterSpacing: "0.2em",
          zIndex: 10000,
          animation: "fadeOutText 0.4s cubic-bezier(0.76, 0, 0.24, 1) 0.6s forwards",
        }}
      >
        LOADING
      </div>
      <style>{`
        @keyframes stairReveal {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(0); }
        }
        @keyframes fadeOutText {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
